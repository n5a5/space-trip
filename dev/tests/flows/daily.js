// Mission of the day: the first mission is today's special one; finishing it gives the Daily mission sticker. The passport shows a world map.
module.exports=async({pg,S,W})=>{await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);await pg.click('.th[data-id="earth"]');   // tap Earth, then tap it again to open Explorer Earth
await W(10000);
const d0=await pg.evaluate(()=>window.__daily());console.log('daily',JSON.stringify(d0));
await pg.click('#actions >> text=Fly!');await W(2000);const m=await pg.evaluate(()=>window.__mission());const dm=await pg.evaluate(()=>window.__daily());console.log('mission',m,JSON.stringify(dm));
if(!dm.daily||m!==dm.target)throw new Error('first mission was not the daily one');
await pg.evaluate(()=>window.__flyGoal());let d1;for(let i=0;i<24;i++){await W(500);d1=await pg.evaluate(()=>window.__daily());if(d1.done)break;}console.log('after',JSON.stringify(d1));if(!d1.done)throw new Error('daily not completed');
await pg.goBack();await W(1500);await pg.keyboard.press('p');await W(1500);await S('dl_passport');};
