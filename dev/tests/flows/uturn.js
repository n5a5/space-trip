// Mission goal behind the plane: with hands off, the plane turns until the goal is in front; 2 quick Backs keep the app.
module.exports=async({pg,S,W})=>{await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(10000);
await pg.click('#actions >> text=Fly!');await W(3000);await pg.evaluate(()=>window.__mission());await W(500);let a=await pg.evaluate(()=>window.__goalAng());
console.log('goal ang at start',a);
await pg.evaluate(()=>window.__flyFlip());await W(300);const a0=await pg.evaluate(()=>window.__goalAng());await S('ut0');
let a1=a0;for(let i=0;i<40&&Math.abs(a1)>1.15;i++){await W(1000);a1=await pg.evaluate(()=>window.__goalAng());}await S('ut1');console.log('after flip',a0,'->',a1);if(Math.abs(a1)>1.2)throw new Error('did not turn toward goal');
await pg.click('#actions >> text=Stop flying');await W(600);await S('ut2');console.log('armed',await pg.evaluate(()=>document.querySelector('#actions .armed')?.textContent));
await pg.click('#actions >> text=Tap again');await W(2000);
await pg.click('#actions >> text=Places');await W(3000);await pg.goBack();await pg.waitForTimeout(250);await pg.goBack();await W(3000);
const url=pg.url();console.log('after 2 backs',url,await pg.evaluate(()=>document.querySelector('#pill')&&document.querySelector('#pill').textContent));if(!/(index|test)\.html/.test(url))throw new Error('double Back left the app');};
