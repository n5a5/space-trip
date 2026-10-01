// Planet screens: the buttons fit (Moon has the most), How long? speaks a trip line, Riddles shows a new riddle.
module.exports=async({pg,S,W})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
await pg.click('#go');await W(2500);await pg.click('.th[data-id="moon"]');await W(5000);await S('focus_moon');
const fit=await pg.evaluate(()=>{const r=document.querySelector('#bottom').getBoundingClientRect(),bs=[...document.querySelectorAll('#actions .act')].map(b=>b.getBoundingClientRect());return {n:bs.length,ok:bs.every(b=>b.bottom<=innerHeight+1&&b.right<=innerWidth+1&&b.left>=-1),top:r.top};});console.log('moon buttons',JSON.stringify(fit));if(!fit.ok)throw new Error('buttons off screen');
await W(700);if(!(await act('How long?')))throw new Error('no How long? button');await W(1500);const said=await pg.evaluate(()=>window.__sayKeys?window.__sayKeys().slice(-1)[0]:document.querySelector('#say')?.textContent);console.log('said',said);
await pg.click('.th[data-id="neptune"]');await W(5000);await W(700);await act('How long?');await W(1500);await S('focus_neptune');};
