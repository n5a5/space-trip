// Builds the standalone GitHub Pages site into site/ : node buildsite.js <src.html> <version>
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const [src = 'space30.src.html', VERSION = 'space-v1'] = process.argv.slice(2), OUT = 'site';
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT);
const cp = (from, to) => { fs.mkdirSync(path.dirname(path.join(OUT, to)), { recursive: true }); fs.copyFileSync(from, path.join(OUT, to)); };
// page body: same injection as the beta build, but three.js is served from the site itself
let body = fs.readFileSync(src, 'utf8').replace('__LAND__', fs.readFileSync('land.json', 'utf8')).replace('__US__', fs.readFileSync('usstates.json', 'utf8')).replace("'__VERSION__'", `'${VERSION}'`);
body = body.replace('"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"',
  '"three":"./vendor/three/build/three.module.js","three/addons/":"./vendor/three/examples/jsm/"');
if (!body.includes('./vendor/three/build/three.module.js')) throw new Error('importmap not rewritten');
const title = body.match(/<title>[^<]*<\/title>\n?/)[0]; body = body.replace(title, '');
const head = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0d0b2e">
<meta name="description" content="A 3D trip through the solar system and around the world, made for a curious kid.">
<title>Amelia's Space Trip</title>
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/icon-192.png">
<link rel="apple-touch-icon" href="icons/icon-192.png">
<style>html,body{height:100%}body{margin:0;background:#0d0b2e}[hidden]{display:none!important}:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}</style>
</head>
<body>
`;
const tail = `
<div id="updtoast" hidden style="position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:99;background:#ffd166;color:#2b0b24;font:600 16px system-ui,sans-serif;padding:12px 18px;border-radius:24px;box-shadow:0 4px 16px #0006;cursor:pointer">✨ New version ready — tap to update</div>
<script>
if ('serviceWorker' in navigator) addEventListener('load', () => {
  const had = !!navigator.serviceWorker.controller, t = document.getElementById('updtoast');
  t.onclick = () => location.reload();
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (had) t.hidden = false; });
  navigator.serviceWorker.register('sw.js').then(r => setInterval(() => r.update().catch(() => {}), 30 * 60 * 1000)).catch(() => {});
});
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(OUT, 'index.html'), head + body + tail);
// three.js (MIT) — only the files the page imports
for (const f of fs.readFileSync('three-deps.txt', 'utf8').trim().split('\n')) cp(path.join('three', f), path.join('vendor/three', f));
cp('three/LICENSE', 'vendor/three/LICENSE');
// assets actually referenced by the page
const refs = new Set([...body.matchAll(/L\('([a-z_]+\.(?:jpg|png))'/g)].map(m => 'tex/' + m[1]).concat([...body.matchAll(/models\/[a-z_]+\.glb/g)].map(m => m[0])));
for (const r of refs) cp(path.join('beta', r), r);
require('./voicesplit.js')(OUT, 'beta/voice.json');
for (const f of fs.readdirSync('terrain')) if (/\.png$/.test(f) && !/preview/.test(f)) cp(path.join('terrain', f), path.join('terrain', f));
cp('terrain/attribution.txt', 'terrain/attribution.txt');
// app icon (drawn with PIL) and manifest
fs.mkdirSync(path.join(OUT, 'icons'), { recursive: true });
execSync(`python3 - <<'EOF'
from PIL import Image, ImageDraw
for n in (192, 512):
    S = n * 4; im = Image.new('RGB', (S, S), (13, 11, 46)); d = ImageDraw.Draw(im)
    import random; random.seed(3)
    for i in range(60): x, y, r = random.random() * S, random.random() * S, random.random() * S * .006 + 2; d.ellipse([x - r, y - r, x + r, y + r], fill=(255, 245, 220))
    c = S / 2; R = S * .3
    d.ellipse([c - R * 1.75, c - R * .42, c + R * 1.75, c + R * .42], outline=(255, 209, 102), width=int(S * .035))
    d.ellipse([c - R, c - R, c + R, c + R], fill=(255, 126, 182))
    d.chord([c - R, c - R, c + R, c + R], 0, 180, fill=(236, 98, 160))
    d.arc([c - R * 1.75, c - R * .42, c + R * 1.75, c + R * .42], 0, 180, fill=(255, 209, 102), width=int(S * .035))
    for sx in (-1, 1): d.ellipse([c + sx * R * .35 - S * .03, c - R * .15 - S * .04, c + sx * R * .35 + S * .03, c - R * .15 + S * .04], fill=(43, 11, 36))
    d.arc([c - R * .3, c - R * .1, c + R * .3, c + R * .35], 20, 160, fill=(43, 11, 36), width=int(S * .02))
    im.resize((n, n), Image.LANCZOS).save('${OUT}/icons/icon-%d.png' % n)
EOF`, { stdio: 'inherit', shell: '/bin/bash' });
fs.writeFileSync(path.join(OUT, 'manifest.webmanifest'), JSON.stringify({ name: "Amelia's Space Trip", short_name: 'Space Trip', start_url: './', scope: './', display: 'fullscreen', orientation: 'portrait',
  background_color: '#0d0b2e', theme_color: '#0d0b2e', icons: [{ src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }] }, null, 1));
// offline service worker: precache every file of this version
const files = []; const walk = d => { for (const f of fs.readdirSync(path.join(OUT, d))) { const p = path.join(d, f); fs.statSync(path.join(OUT, p)).isDirectory() ? walk(p) : files.push(p); } }; walk('');
const ASSETS = ['./', ...files.filter(f => !/^(sw\.js|README\.md|\.nojekyll)$/.test(f) && !/^(dev|\.github|terrain\/attribution)/.test(f)).sort()];
fs.writeFileSync(path.join(OUT, 'sw.js'), `// Offline cache for Amelia's Space Trip. Bump VERSION on every deploy.
const VERSION = '${VERSION}';
const ASSETS = ${JSON.stringify(ASSETS, null, 1)};
self.addEventListener('install', e => e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
    if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }   // fonts and anything else, cached on first use
    return res;
  }).catch(() => e.request.mode === 'navigate' ? caches.match('./index.html') : Response.error())));
});
`);
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
fs.copyFileSync('site-README.md', path.join(OUT, 'README.md'));
const size = files.reduce((a, f) => a + fs.statSync(path.join(OUT, f)).size, 0);
console.log(VERSION, files.length + ' files', (size / 1e6).toFixed(1) + ' MB');
