module.exports=async({pg,S,W})=>{const f=()=>pg.evaluate(()=>window.__fly());await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(10000);
await pg.click('#actions >> text=Fly!');await W(3000);const m=await pg.evaluate(()=>window.__mission());await W(3000);await S('v0_goal');console.log('mission',m);
await pg.evaluate(()=>window.__flyTo('bigben'));await W(4000);await S('v1_near');console.log('near',JSON.stringify(await f()));
await pg.click('#actions >> text=Land');await W(3000);await S('v2_stamp');await W(12000);await S('v3_landed');
console.log('landed',JSON.stringify(await f()));
await pg.click('#actions >> text=Stop');await W(800);await S('v4_stoparm');};
