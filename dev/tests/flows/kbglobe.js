// Keyboard play on Explorer Earth: arrows turn the globe, a crosshair appears, Enter taps what is under it; a touch hides the crosshair.
module.exports=async({pg,S,W})=>{await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await pg.click('.th[data-id="earth"]');await W(12000);
const a=await pg.evaluate(()=>window.__camLL());for(let i=0;i<4;i++){await pg.keyboard.press('ArrowRight');await W(300);}await W(2500);const b=await pg.evaluate(()=>window.__camLL());console.log('camera',a,'->',b);
if(Math.abs(a[1]-b[1])<5)throw new Error('arrow keys did not turn the globe');
const aim=await pg.evaluate(()=>{const c=document.querySelector('#kbaim');return !!c&&!c.hidden;});if(!aim)throw new Error('no crosshair');await S('kb_aim');
const p0=await pg.evaluate(()=>document.querySelector('#pill').textContent);await pg.keyboard.press('Enter');await W(2500);const p1=await pg.evaluate(()=>document.querySelector('#pill').textContent);console.log('pill',p0,'->',p1);
if(p0===p1)throw new Error('Enter did not tap the globe');
await pg.mouse.click(30,300);await W(500);const gone=await pg.evaluate(()=>{const c=document.querySelector('#kbaim');return !c||c.hidden;});if(!gone)throw new Error('crosshair stayed after a tap');};
