// Phone-size browser tests: node dev/tests/run.js <flow...>  (serve the repo root on :8765 first)
// Each flow drives the real page like a child would; any page error, console error or HTTP error fails the run.
let pw; try { pw = require('playwright'); } catch { pw = require('playwright-core'); }
const { chromium } = pw;
const flows = process.argv.slice(2);
(async () => {
  let failed = 0;
  for (const f of flows) {
    const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
    const ctx = await b.newContext({ viewport: { width: 412, height: 860 }, timezoneId: 'America/New_York', serviceWorkers: 'block' }), pg = await ctx.newPage(), errs = [];
    pg.on('pageerror', e => errs.push('page error: ' + e.message));
    pg.on('console', m => { if (m.type() === 'error' && !/fonts\.g|ERR_FAILED|ERR_CERT/.test(m.text())) errs.push('console: ' + m.text().slice(0, 300)); });
    pg.on('response', r => { if (r.status() >= 400) errs.push('HTTP ' + r.status() + ' ' + r.url()); });
    await pg.route('https://fonts.**', r => r.abort());
    const W = ms => pg.waitForTimeout(ms), S = n => pg.screenshot({ path: `dev/tests/out/${f}-${n}.png`, timeout: 120000 });   // CI renders in software: slow frames
    const visit = async id => { if (await pg.$('#tstrip:not([hidden])')) { await pg.click(`#tstrip .th[data-lm="${id}"]`); await W(2500); await pg.click('#actions >> text=Visit'); } else await pg.click(`#wstrip .th[data-id="${id}"]`); };
    const t0 = Date.now();
    try { await pg.goto(`http://localhost:${process.env.PORT || 8765}/index.html`); await W(2500); await require(`./flows/${f}.js`)({ pg, S, W, visit }); }
    catch (e) { errs.push('flow failed: ' + e.message.split('\n')[0]); }
    console.log(`${errs.length ? '✗' : '✓'} ${f} (${((Date.now() - t0) / 1000).toFixed(0)} s)${errs.length ? '\n  ' + errs.join('\n  ') : ''}`);
    if (errs.length) failed++;
    await b.close();
  }
  process.exit(failed ? 1 : 0);
})();
