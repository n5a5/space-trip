import math, json, os, time, urllib.request, io
import numpy as np
from PIL import Image

OUT = os.path.dirname(os.path.abspath(__file__))
Z = 12
URL = "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"
N = 512
SIZE = 20000.0
R = 6378137.0
ATTR = open(os.path.join(OUT, "attribution.txt"), encoding="utf-8").read().strip()

def merc_px(lat, lon, z):
    n = 256 * 2**z
    x = (lon + 180) / 360 * n
    s = math.sin(math.radians(lat))
    y = (0.5 - math.log((1 + s) / (1 - s)) / (4 * math.pi)) * n
    return x, y

def fetch(z, x, y):
    p = os.path.join(OUT, "tiles", f"{z}_{x}_{y}.png")
    if not os.path.exists(p):
        with urllib.request.urlopen(URL.format(z=z, x=x, y=y), timeout=30) as r:
            data = r.read()
        open(p, "wb").write(data); time.sleep(0.3)
    a = np.asarray(Image.open(p).convert("RGB")).astype(np.float64)
    return a[..., 0] * 256 + a[..., 1] + a[..., 2] / 256 - 32768

def build(name, lat0, lon0):
    half = SIZE / 2 * 1.05
    dlat = math.degrees(half / R); dlon = math.degrees(half / (R * math.cos(math.radians(lat0))))
    x0, y0 = merc_px(lat0 + dlat, lon0 - dlon, Z); x1, y1 = merc_px(lat0 - dlat, lon0 + dlon, Z)
    tx0, ty0, tx1, ty1 = int(x0 // 256), int(y0 // 256), int(x1 // 256), int(y1 // 256)
    tiles = []
    mosaic = np.zeros(((ty1 - ty0 + 1) * 256, (tx1 - tx0 + 1) * 256))
    for ty in range(ty0, ty1 + 1):
        for tx in range(tx0, tx1 + 1):
            mosaic[(ty-ty0)*256:(ty-ty0+1)*256, (tx-tx0)*256:(tx-tx0+1)*256] = fetch(Z, tx, ty)
            tiles.append(f"{Z}/{tx}/{ty}")
    # local metric grid: pixel centres, east=+col, north=up (row 0 = north)
    mpp = SIZE / N
    c = (np.arange(N) + 0.5) * mpp - SIZE / 2
    E, Nn = np.meshgrid(c, -c)
    # local-tangent (azimuthal-equidistant-ish) inverse, accurate to << 1 px over 20 km
    lat = lat0 + np.degrees(Nn / R)
    lon = lon0 + np.degrees(E / (R * np.cos(np.radians(lat0))))
    n = 256 * 2**Z
    px = (lon + 180) / 360 * n - tx0 * 256 - 0.5
    s = np.sin(np.radians(lat))
    py = (0.5 - np.log((1 + s) / (1 - s)) / (4 * np.pi)) * n - ty0 * 256 - 0.5
    ix = np.floor(px).astype(int); iy = np.floor(py).astype(int); fx = px - ix; fy = py - iy
    assert ix.min() >= 0 and iy.min() >= 0 and ix.max() + 1 < mosaic.shape[1] and iy.max() + 1 < mosaic.shape[0]
    m = mosaic
    h = (m[iy, ix] * (1-fx) * (1-fy) + m[iy, ix+1] * fx * (1-fy) + m[iy+1, ix] * (1-fx) * fy + m[iy+1, ix+1] * fx * fy)
    # also raw mosaic max within the square (unsmoothed)
    # encode terrarium
    v = np.clip(h + 32768, 0, 65535.99)
    r = np.floor(v / 256); g = np.floor(v - r * 256); b = np.floor((v - np.floor(v)) * 256)
    rgb = np.stack([r, g, b], -1).astype(np.uint8)
    Image.fromarray(rgb, "RGB").save(os.path.join(OUT, f"{name}.png"), optimize=True)
    # verify round trip
    d = np.asarray(Image.open(os.path.join(OUT, f"{name}.png"))).astype(np.float64)
    dec = d[..., 0] * 256 + d[..., 1] + d[..., 2] / 256 - 32768
    rt = float(np.abs(dec - h).max())
    # hillshade (sun from NW, 45 deg altitude, 1.5x vertical exaggeration)
    gy, gx = np.gradient(h * 1.5, mpp)  # gy: d/drow (south), gx: d/dcol (east)
    dzdx, dzdy_n = gx, -gy
    slope = np.arctan(np.hypot(dzdx, dzdy_n)); aspect = np.arctan2(-dzdx, -dzdy_n)
    az = math.radians(315); alt = math.radians(45)
    # illumination: normal vs sun vector
    nx, ny, nz = -dzdx, -dzdy_n, np.ones_like(h); nl = np.sqrt(nx**2 + ny**2 + 1)
    sx, sy, sz = math.cos(alt) * math.sin(az), math.cos(alt) * math.cos(az), math.sin(alt)
    shade = np.clip((nx * sx + ny * sy + nz * sz) / nl, 0, 1)
    tint = (h - h.min()) / (h.max() - h.min())
    img = np.clip(255 * (0.75 * shade + 0.25 * tint), 0, 255).astype(np.uint8)
    Image.fromarray(img, "L").save(os.path.join(OUT, f"{name}-preview.png"), optimize=True)
    iy_, ix_ = np.unravel_index(np.argmax(h), h.shape)
    stats = dict(tiles=tiles, roundtrip_max_err=rt, argmax_px=[int(ix_), int(iy_)],
                 argmax_offset_m=[float((ix_ + 0.5) * mpp - SIZE/2), float(SIZE/2 - (iy_ + 0.5) * mpp)],
                 centre_elev=float(h[N//2-1:N//2+1, N//2-1:N//2+1].mean()),
                 p1=float(np.percentile(h, 1)), p50=float(np.percentile(h, 50)), p99=float(np.percentile(h, 99)),
                 voids=int((h < -100).sum()),
                 native_mpp=float(2*math.pi*R*math.cos(math.radians(lat0))/(256*2**Z)),
                 mosaic_max=float(mosaic.max()))
    meta = {"center": [lat0, lon0], "sizeMeters": SIZE, "pixels": N, "metersPerPixel": mpp,
            "minElev": round(float(h.min()), 2), "maxElev": round(float(h.max()), 2), "encoding": "terrarium",
            "source": f"AWS Open Data Terrain Tiles (Mapzen/Tilezen joerd), Terrarium encoding: {URL} at zoom {Z} (tiles {', '.join(tiles)}); bilinear-resampled to a local east/north metric grid, north up, row 0 = north edge",
            "attribution": ATTR}
    json.dump(meta, open(os.path.join(OUT, f"{name}.json"), "w"), indent=2, ensure_ascii=False)
    return meta, stats

for name, la, lo in [("everest", 27.9881, 86.9250), ("grand-canyon", 36.10, -112.11)]:
    meta, st = build(name, la, lo)
    print(name, {k: meta[k] for k in ("minElev", "maxElev", "metersPerPixel")}, json.dumps(st))
