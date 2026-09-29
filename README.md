# Amelia's Space Trip

A 3D trip through the solar system and around the world, made for a curious six-year-old.
Fly between the planets, explore real features on each world, drive a rover on Mars, visit famous
landmarks, and play on Toy Earth. Luna, the guide, reads every fact aloud.

**Play:** open the GitHub Pages link on a phone and use "Add to Home screen". After the first load it works offline.

## How it's built

A single static page (`index.html`) using [three.js](https://threejs.org) r160, served from `vendor/`.
No build step, no accounts, no tracking, no network calls to anything but this site (and Google Fonts, optional).
`sw.js` caches every file for offline use; bump `VERSION` in it on each deploy.

## Credits and licences

- **three.js** r160 — MIT licence (`vendor/three/LICENSE`).
- **Planet maps (Real mode):** Solar System Scope (solarsystemscope.com/textures), CC BY 4.0, developed by INOVE, based on NASA data.
- **Earth and Moon maps, star map, Europa and Titan:** NASA / NASA-JPL (public domain), via NASA 3D Resources and the three.js examples.
- **Saturn V and Perseverance models:** NASA 3D Resources (public domain). NASA does not endorse this project.
- **Map outlines and country borders:** Natural Earth (public domain) via world-atlas.
- **U.S. state outlines:** U.S. Census Bureau (public domain) via us-atlas (ISC).
- **Voice:** generated with Kokoro-82M (Apache 2.0), voice af_heart.
- **Statue of Liberty model, landmarks, Toy Earth and everything else:** made procedurally for this project.
