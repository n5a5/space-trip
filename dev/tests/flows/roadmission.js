// Road-trip mission: on I-10 near Houston, a mission to drive the interstate city by city; each city moves the goal on; the end gives the Highway hero sticker.
module.exports=async({pg,S,W})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t),rm=()=>pg.evaluate(()=>window.__roadMission());
await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await pg.click('.th[data-id="earth"]');await W(11000);
await act('Drive!');await W(4000);await pg.keyboard.down('s');await W(1500);
const ok=await pg.evaluate(()=>{window.__driveTo(29.76,-95.37);return window.__startRoadMission();});let m=await rm();console.log('mission',ok,JSON.stringify(m));if(!m)throw new Error('no road mission on I-10');await W(1500);await S('rm_start');
for(let k=0;k<12&&m;k++){await pg.evaluate(([a,o])=>window.__driveTo(a,o),[m.lat,m.lon]);await W(2500);const m2=await rm();console.log('after',k,JSON.stringify(m2));if(m2&&m2.i===m.i)throw new Error('checkpoint not reached');m=m2;}
await pg.keyboard.up('s');await W(3000);await S('rm_done');const st=await pg.evaluate(()=>{try{return localStorage.getItem('ast-passport')||''}catch{return ''}});console.log('highway sticker',/highway/.test(st));if(m)throw new Error('mission never finished');};
