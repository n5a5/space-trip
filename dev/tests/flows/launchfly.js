// Launch: after the countdown a Hold to fly button appears; holding it speeds the rocket up; letting go slows it; with nobody pressing it still takes off; the trip ends in space.
module.exports=async({pg,S,W})=>{const L=()=>pg.evaluate(()=>window.__launch()),act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
await pg.click('#go');await W(2000);if(!(await act('Fly home'))){await act('Planets');await W(1500);}await W(1500);await act('Fly home');await W(16000);
await act('Back to space');
for(let i=0;i<40&&!(await L()).hold;i++)await W(500);let s=await L();console.log('button up',JSON.stringify(s));if(!s.hold)throw new Error('no Hold to fly button');await S('lf_button');
const box=await pg.locator('#holdfly').boundingBox();await pg.mouse.move(box.x+box.width/2,box.y+box.height/2);await pg.mouse.down();await W(3500);const a=await L();await pg.mouse.up();await W(1500);const b=await L();
console.log('holding',JSON.stringify(a),'let go',JSON.stringify(b));if(a.thrust!==1||!(a.v>1.4))throw new Error('holding did not speed up');if(b.v>a.v)throw new Error('letting go did not ease off');
for(let i=0;i<180&&(await L()).mode==='launch';i++)await W(500);const c=await L();console.log('end',JSON.stringify(c));await S('lf_space');if(c.mode==='launch')throw new Error('launch never finished');};
