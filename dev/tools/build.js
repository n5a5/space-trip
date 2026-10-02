// Rebuilds the live site in the repo root from dev/src/app.src.html (run from dev/: npm run build [-- space-vN]).
// Uses the assets already in the repo (vendor/, tex/, models/, terrain/, voice/, icons/); regenerates index.html and sw.js.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', '..'), DEV = path.join(__dirname, '..');
const cur = (fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8').match(/const VERSION = '([^']+)'/) || [])[1];
const VERSION = process.argv[2] || cur;
let body = fs.readFileSync(path.join(DEV, 'src', 'app.src.html'), 'utf8').replace('__LAND__', fs.readFileSync(path.join(DEV, 'data', 'land.json'), 'utf8'))
  .replace('__US__', fs.readFileSync(path.join(DEV, 'data', 'usstates.json'), 'utf8')).replace("'__VERSION__'", `'${VERSION}'`);
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
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' data: blob:; worker-src 'self' blob:; object-src 'none'; base-uri 'none'; form-action 'none'">
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
  t.onclick = () => { t.textContent = '✨ Updating…'; location.reload(); };
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (!had) return; const c = navigator.serviceWorker.controller;
    const show = () => { const g = document.getElementById('go'); if (g && g.offsetParent) location.reload(); else t.hidden = false; };
    if (!c || c.state === 'activated') show(); else c.addEventListener('statechange', function f(){ if (c.state === 'activated') { c.removeEventListener('statechange', f); show(); } });   // offer the update only once it can load at once
  });
  navigator.serviceWorker.register('sw.js').then(r => setInterval(() => r.update().catch(() => {}), 30 * 60 * 1000)).catch(() => {});
});
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(ROOT, 'index.html'), head + body + tail);
// every model, texture and voice clip the page asks for must be in the repo
const need = [...body.matchAll(/L\('([a-z_]+\.(?:jpg|png))'/g)].map(m => 'tex/' + m[1]).concat([...body.matchAll(/models\/[a-z_]+\.glb/g)].map(m => m[0]));
const missing = need.filter(f => !fs.existsSync(path.join(ROOT, f))); if (missing.length) throw new Error('missing assets: ' + missing.join(', '));
// offline cache: every site file, not the dev tools
const files = []; const walk = d => { for (const f of fs.readdirSync(path.join(ROOT, d))) { const p = path.join(d, f); if (/^(\.git|dev|\.github)$/.test(p)) continue; fs.statSync(path.join(ROOT, p)).isDirectory() ? walk(p) : files.push(p); } }; walk('');
const ASSETS = ['./', ...files.filter(f => !/^(sw\.js|README\.md|\.nojekyll|\.gitignore)$/.test(f) && !/^terrain\/attribution/.test(f)).sort()];
fs.writeFileSync(path.join(ROOT, 'sw.js'), `// Offline cache for Amelia's Space Trip. Bump VERSION on every deploy.
const VERSION = '${VERSION}';
const ASSETS = ${JSON.stringify(ASSETS, null, 1)};
// install never fails as a whole: the page itself must arrive, the rest is cached file by file (a few at a time) and anything missed loads on first use
const CORE = ['./', 'index.html'];
self.addEventListener('install', e => e.waitUntil(caches.open(VERSION).then(async c => {
  await c.addAll(CORE); const rest = ASSETS.filter(a => !CORE.includes(a)); let i = 0;
  await Promise.all([...Array(6)].map(async () => { while (i < rest.length) { const a = rest[i++]; try { await c.add(a); } catch {} } }));
}).then(() => self.skipWaiting())));
// before dropping an old version, copy over any file the new one couldn't fetch (so offline play keeps working)
const WANT = new Set(ASSETS.map(a => new URL(a, self.registration.scope).href));
self.addEventListener('activate', e => e.waitUntil(caches.open(VERSION).then(async now => {
  const have = new Set((await now.keys()).map(r => r.url.split('?')[0]));   // one pass: a search per file took a minute on 1500 files, and page loads wait for activation
  for (const k of (await caches.keys()).filter(k => k !== VERSION)) { const old = await caches.open(k);
    for (const req of await old.keys()) { const u = req.url.split('?')[0]; if (WANT.has(u) && !have.has(u)) { const r = await old.match(req); if (r) { await now.put(req, r); have.add(u); } } }
    await caches.delete(k); }
}).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
    if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }   // fonts and anything else, cached on first use
    return res;
  }).catch(() => e.request.mode === 'navigate' ? caches.match('./index.html') : Response.error())));
});
`);
console.log('built', VERSION, ASSETS.length, 'cached files');
