// Landing at the Eiffel Tower and the Pyramids: the landmark is framed in full, the plane beside it (not inside it).
module.exports=async({pg,S,W})=>{const f=()=>pg.evaluate(()=>window.__fly());await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(9000);
await pg.click('#actions >> text=Fly!');await W(2500);
for(const id of ['eiffel','pyramids']){await pg.evaluate(id=>window.__flyTo(id),id);for(let i=0;i<16&&!(await f()).near;i++)await W(500);await W(600);
  await pg.evaluate(()=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes('Land'));b&&b.click();});await W(14000);await S('lv_'+id);console.log(id,JSON.stringify(await f()).slice(0,80));
  await pg.evaluate(()=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes('Take off'));b&&b.click();});await W(3000);await S('lv_'+id+'_off');}};
