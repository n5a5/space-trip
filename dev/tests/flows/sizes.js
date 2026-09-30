// Planet sizes: open from the solar system, see the row, swipe, tap Jupiter; close with Back.
module.exports=async({pg,S,W})=>{await pg.click('#go');await W(3000);await pg.click('#actions >> text=Sizes');await W(2000);await S('sz0');
await pg.evaluate(()=>{document.querySelector('#szrow').scrollLeft=500});await W(800);await S('sz1');
await pg.click('#szrow .sz:has-text("Jupiter")');await W(1500);console.log('cap',await pg.evaluate(()=>document.querySelector('#caption').textContent.slice(0,60)));
await pg.goBack();await W(1500);const open=await pg.evaluate(()=>!document.querySelector('#sizes').hidden);if(open)throw new Error('Back did not close sizes');};
