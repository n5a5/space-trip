// Walk on Europa and on Titan: each opens from its planet screen, has its own look, five glowing rocks, a big hop, and a sticker when all are found.
module.exports=async({pg,S,W})=>{const m=()=>pg.evaluate(()=>window.__moon()),act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
await pg.click('#go');await W(2500);
for(const w of ['europa','titan']){await pg.click(`.th[data-id="${w}"]`);await W(5000);await W(700);if(!(await act('Walk on')))throw new Error('no Walk on button for '+w);await W(9000);await S('walk_'+w);
  const a=await m();console.log(w,JSON.stringify(a));if(a.n!==5)throw new Error(w+' should have 5 rocks');
  await W(700);await act('Jump!');let top=0;for(let i=0;i<40;i++){await W(300);const j=await m();top=Math.max(top,j.y);if(!(j.jumpT>0)&&i>3)break;}console.log(w,'hop',top);if(!(top>4))throw new Error('no hop on '+w);
  await pg.evaluate(()=>window.__moonFindAll());await W(3000);const b=await m();if(b.found!==5)throw new Error(w+' rocks not found');await S('walk_'+w+'_done');
  await W(700);await act('Back to space');await W(5000);}};
