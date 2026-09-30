// Explorer Earth: fly the plane, steer, reach the Eiffel Tower, land for a stamp, take off, Back stops flying.
module.exports=async({pg,S,W})=>{const f=()=>pg.evaluate(()=>window.__fly());
await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(10000);
await pg.click('#actions >> text=Fly!');await W(3000);await S('f0_start');console.log('start',JSON.stringify(await f()));
await W(4000);await S('f1_rings');console.log('4s',JSON.stringify(await f()));
// steer: drag right and up
await pg.mouse.move(206,500);await pg.mouse.down();await pg.mouse.move(270,450,{steps:5});await W(2500);await S('f2_turn');await pg.mouse.up();console.log('turn',JSON.stringify(await f()));
await W(5000);console.log('10s',JSON.stringify(await f()));
await pg.evaluate(()=>window.__flyTo('eiffel'));for(let i=0;i<16&&!(await f()).near;i++)await W(500);await S('f3_near');console.log('near',JSON.stringify(await f()));
await pg.click('#actions >> text=Land');await W(4000);await S('f4_land');console.log('land',JSON.stringify(await f()));
if(!(await f()).landed)throw new Error('did not land');if((await f()).stamps<1)throw new Error('no stamp');
const m=await pg.evaluate(()=>window.__mission());await pg.click('#actions >> text=Take off');await W(1500);await pg.evaluate(()=>window.__flyGoal());await W(3000);await S('f5_mission');console.log('mission',m,JSON.stringify(await f()));if((await f()).missions<1)throw new Error('mission not completed');
await pg.goBack();await W(3000);await S('f6_stop');if(await f())throw new Error('Back did not stop flying');console.log('stopped',JSON.stringify(await f()), await pg.evaluate(()=>document.querySelector('#pill').textContent));};
