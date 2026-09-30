# Development

- `src/app.src.html` — the app source. `__LAND__`, `__US__` and `__VERSION__` are filled in by the build.
- `npm run build [-- space-vN]` (in dev/) — `tools/build.js` rebuilds index.html and sw.js in the repo root from `src/app.src.html` and `data/`, using the assets already committed; it fails if a model or texture the page loads is missing. Pass a new VERSION for every release.
- `tools/buildsite.js` — (original, for a scratch layout) builds the site (index.html, vendored three.js, models, terrain, voice/, sw.js with a new VERSION).
  It expects the working layout it was written in (`land.json`, `usstates.json`, `three/`, `beta/tex`, `beta/models`, `beta/voice.json`, `terrain/`).
- `tools/lines.js` → `lines.json` (every spoken line); `tools/render.py` renders them with Kokoro-82M (af_heart) into `voice.json`;
  `tools/voicesplit.js` splits that into `voice/<fnv1a>.ogg` + `voice/index.json`.
- `tools/terrain_build.py` — stitches AWS Terrain Tiles (Terrarium) into `terrain/*.png`.
- `tests/run.js` + `tests/flows/*.js` — phone-size Playwright flows; CI runs them on every push (`.github/workflows/test.yml`).
  Locally: `python3 -m http.server 8765` in the repo root, then `cd dev && npm install && npm test`.
