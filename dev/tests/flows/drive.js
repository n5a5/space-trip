// Explorer Earth: drive the car anywhere, see where you are, park at the Statue of Liberty for a stamp, drive on, Back stops, then fly.
module.exports=async({pg,S,W})=>{const f=()=>pg.evaluate(()=>window.__fly());
await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);await pg.click('.th[data-id="earth"]');   // tap Earth, then tap it again to open Explorer Earth
await W(10000);
await pg.click('#actions >> text=Drive!');await W(4000);await S('d0_start');console.log('start',JSON.stringify(await f()));if((await f()).kind!=='car'||!(await f()).where)throw new Error('not driving / no location');
await pg.mouse.move(206,500);await pg.mouse.down();await pg.mouse.move(150,500,{steps:5});await W(4000);await S('d1_turn');await pg.mouse.up();console.log('turn',JSON.stringify(await f()));
await W(8000);await S('d2_on');console.log('8s',JSON.stringify(await f()));
await pg.evaluate(()=>window.__flyTo('liberty'));for(let i=0;i<16&&!(await f()).near;i++)await W(500);await W(600);await S('d3_near');console.log('near',JSON.stringify(await f()));
await pg.click('#actions >> text=Park');await W(4000);await S('d4_park');console.log('park',JSON.stringify(await f()));if((await f()).landed!=='liberty')throw new Error('did not park at Liberty');
await pg.click('#actions >> text=Drive on');await W(5000);await S('d5_boat');console.log('driveon',JSON.stringify(await f()));
await pg.goBack();await W(3000);if(await f())throw new Error('Back did not stop driving');
await pg.click('#actions >> text=Fly!');await W(5000);await S('d6_fly');console.log('fly',JSON.stringify(await f()));};
