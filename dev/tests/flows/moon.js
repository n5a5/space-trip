// Moon walk: from the Moon, walk with Amelia (low-gravity bounce), leave footprints, find a moon rock; Back returns to space; Mars still drives.
module.exports=async({pg,S,W})=>{await pg.click('#go');await W(2000);await pg.click('.th[data-id="moon"]');await W(4000);
await pg.click('#actions >> text=Walk on the Moon');await W(12000);await S('mo0');
const go=await pg.$('#dgo');const bb=await go.boundingBox();await pg.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2);await pg.mouse.down();await W(6000);await S('mo1_walk');await pg.mouse.up();
console.log('pill',await pg.evaluate(()=>document.querySelector('#pill').textContent));
await pg.goBack();await W(4000);console.log('back to',await pg.evaluate(()=>document.querySelector('#pill').textContent));
await pg.click('.th[data-id="mars"]');await W(4000);await pg.click('#actions >> text=Drive on Mars');await W(12000);await S('mo2_mars');};
