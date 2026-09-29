// Offline cache for Amelia's Space Trip. Bump VERSION on every deploy.
const VERSION = 'space-v2';
const ASSETS = [
 "./",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "index.html",
 "manifest.webmanifest",
 "models/liberty.gltf.json",
 "models/perseverance.gltf.json",
 "models/saturn_v.gltf.json",
 "tex/earth_clouds.jpg",
 "tex/earth_day.jpg",
 "tex/earth_lights.jpg",
 "tex/earth_normal.jpg",
 "tex/earth_spec.jpg",
 "tex/europa.jpg",
 "tex/sss_jupiter.jpg",
 "tex/sss_mars.jpg",
 "tex/sss_mercury.jpg",
 "tex/sss_moon.jpg",
 "tex/sss_neptune.jpg",
 "tex/sss_saturn.jpg",
 "tex/sss_uranus.jpg",
 "tex/sss_venus_atmosphere.jpg",
 "tex/stars.jpg",
 "tex/titan.jpg",
 "vendor/three/LICENSE",
 "vendor/three/build/three.module.js",
 "vendor/three/examples/jsm/loaders/GLTFLoader.js",
 "vendor/three/examples/jsm/objects/Lensflare.js",
 "vendor/three/examples/jsm/objects/Sky.js",
 "vendor/three/examples/jsm/postprocessing/EffectComposer.js",
 "vendor/three/examples/jsm/postprocessing/MaskPass.js",
 "vendor/three/examples/jsm/postprocessing/OutputPass.js",
 "vendor/three/examples/jsm/postprocessing/Pass.js",
 "vendor/three/examples/jsm/postprocessing/RenderPass.js",
 "vendor/three/examples/jsm/postprocessing/ShaderPass.js",
 "vendor/three/examples/jsm/postprocessing/UnrealBloomPass.js",
 "vendor/three/examples/jsm/shaders/CopyShader.js",
 "vendor/three/examples/jsm/shaders/LuminosityHighPassShader.js",
 "vendor/three/examples/jsm/shaders/OutputShader.js",
 "vendor/three/examples/jsm/utils/BufferGeometryUtils.js",
 "voice.json"
];
self.addEventListener('install', e => e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
    if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }   // fonts and anything else, cached on first use
    return res;
  }).catch(() => e.request.mode === 'navigate' ? caches.match('./index.html') : Response.error())));
});
