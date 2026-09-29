const {chromium}=require('playwright-core');const path=require('path');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const ctx=await b.newContext({viewport:{width:412,height:860},timezoneId:'America/New_York'});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.route('https://cdn.jsdelivr.net/**',r=>{const u=r.request().url().split('three@0.160.0/')[1];r.fulfill({path:path.join(__dirname,'three',u),contentType:'application/javascript'})});
await pg.route('https://fonts.**',r=>r.abort());
await pg.goto('file://'+path.join(__dirname,'beta',process.env.PAGE||'test.html'));await pg.waitForTimeout(2500);
const L=await pg.evaluate(()=>window.__allLines());fs.writeFileSync('lines.json',JSON.stringify(L,null,0));
console.log(L.length,'lines');console.log(JSON.stringify(await pg.evaluate(()=>window.__sky()),null,1));console.log(errs.join('\n'));await b.close();})();
