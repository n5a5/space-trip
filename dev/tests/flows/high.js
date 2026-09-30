// Flying high (alt 1.4) near a landmark still offers Land.
module.exports=async({pg,S,W})=>{const f=()=>pg.evaluate(()=>window.__fly());await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);await pg.click('.th[data-id="earth"]');   // tap Earth, then tap it again to open Explorer Earth
await W(10000);
await pg.click('#actions >> text=Fly!');await W(3000);await pg.evaluate(()=>window.__flyAlt(1.4));await W(1500);await pg.evaluate(()=>window.__flyTo('eiffel'));
let n=null;for(let i=0;i<15&&!n;i++){await W(500);n=(await f()).near;}await S('hi0');console.log('near at 1.4',n);if(!n)throw new Error('no Land when flying high');};
