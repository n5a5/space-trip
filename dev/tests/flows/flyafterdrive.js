// Drive! by Kennedy Space Center, then Fly!: the landmark badge never fills the screen (it fades when the camera is close); a quick second tap on the planet strip doesn't open the neighbour.
module.exports=async({pg,S,W})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
await pg.click('#go');await W(2500);
const r=await pg.evaluate(()=>document.querySelector('#strip .th[data-id="earth"]').getBoundingClientRect());await pg.mouse.click(r.x+r.width/2,r.y+r.height/2);await W(1500);await pg.mouse.click(r.x+r.width/2,r.y+r.height/2);await W(3000);
const pill=await pg.evaluate(()=>document.querySelector('#pill').textContent);console.log('after double tap',pill);if(!/Earth/.test(pill))throw new Error('second strip tap opened '+pill);
await act('Explore Earth');await W(12000);
await act('Drive!');await W(3000);await pg.evaluate(()=>window.__driveTo(28.75,-80.85));await W(5000);await act('Stop driving');await W(400);await act('Tap again');let ok=false;for(let i=0;i<20&&!ok;i++){await W(1000);ok=await act('Fly!');}if(!ok)throw new Error('no Fly!: '+await pg.evaluate(()=>[...document.querySelectorAll('#actions .act')].map(b=>b.textContent.trim()).join('|')));
await W(1500);await pg.evaluate(()=>window.__flyToLL(27.9,-80.7));let worst=0,seen=0;for(let i=0;i<10;i++){await W(800);const b=await pg.evaluate(()=>window.__beacon());if(i===2)await S('fad_fly');if(b&&b.vis)seen++;if(b&&b.vis&&b.d<2)worst=Math.max(worst,b.op);if(i<6)console.log(JSON.stringify(b));}
console.log('worst close-badge opacity',worst,'badge frames',seen);if(worst>.05)throw new Error('badge shows right on the camera: '+worst);};
