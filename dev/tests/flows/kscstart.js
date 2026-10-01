// Drive! starting near Kennedy Space Center: the car starts back from the rocket (on land) and faces it, so the landmark doesn't fill the camera.
module.exports=async({pg,S,W})=>{const tap=s=>process.env.TOUCH?pg.tap(s):pg.click(s),act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
await tap('#go');await W(2000);await tap('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await tap('.th[data-id="earth"]');await W(11000);
await act('Drive!');await W(800);
const d=await pg.evaluate(()=>window.__flyLL());await W(5000);await S('ksc_start');
console.log('car at',JSON.stringify(d));if(d){const dd=Math.hypot(d[0]-28.57,(d[1]+80.65)*Math.cos(28.6*Math.PI/180));console.log('degrees from KSC',dd.toFixed(2));if(dd<1)throw new Error('car starts on top of the landmark');}};
