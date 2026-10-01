// Road trip: crossing a state line by car announces the state (and records it); the interstate lookup knows I-10 at Houston and I-95 at Philadelphia.
module.exports=async({pg,S,W})=>{const f=()=>pg.evaluate(()=>window.__fly());await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await pg.click('.th[data-id="earth"]');await W(9000);
const r1=await pg.evaluate(()=>[window.__onRoad(29.76,-95.37),window.__onRoad(39.95,-75.17),window.__onRoad(45,-100)]);console.log('roads',JSON.stringify(r1));if(r1[0]!=='I-10'||r1[1]!=='I-95'||r1[2]!==null)throw new Error('interstate lookup wrong');
await pg.click('#actions >> text=Drive!');await W(2500);await pg.keyboard.down('s');await pg.evaluate(()=>window.__driveTo(31,-100));   // brake (hold S) so the car stays put while the name settles
let s;for(let i=0;i<40;i++){await W(500);s=await f();if(s.where==='Texas')break;}console.log('in',s.where);
await pg.evaluate(()=>window.__driveTo(35.5,-97.5));for(let i=0;i<40;i++){await W(500);s=await f();if(s.where==='Oklahoma')break;}await W(1500);
const rs=await pg.evaluate(()=>window.__roadStates());const cap=await pg.evaluate(()=>document.querySelector('#caption').textContent);console.log('now',s.where,'road states',JSON.stringify(rs),'caption',cap.slice(0,70));await S('roadtrip');await pg.keyboard.up('s');
if(!rs.includes('Oklahoma'))throw new Error('crossing into Oklahoma was not recorded');};
