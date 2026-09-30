// Holding down: the plane slows to a hover, the car brakes to a stop; letting go speeds up again.
module.exports=async({pg,S,W})=>{const f=()=>pg.evaluate(()=>window.__fly());await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);await pg.click('.th[data-id="earth"]');await W(9000);
for(const [kind,key] of [['Fly!','ArrowDown'],['Drive!','s']]){await pg.click('#actions >> text='+kind);await W(2500);const v0=(await f()).v;await pg.keyboard.down(key);let v=v0;
  for(let i=0;i<40&&v>.15;i++){await W(500);v=(await f()).v;}await S('hv_'+key);await pg.keyboard.up(key);let v2=v;for(let i=0;i<40&&v2<.6;i++){await W(500);v2=(await f()).v;}
  console.log(kind,'speed',v0,'-> held down',v,'-> let go',v2);if(v>.15)throw new Error(kind+' did not slow to a stop/hover');if(v2<.6)throw new Error(kind+' did not speed up again');
  await pg.evaluate(()=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>/Stop (flying|driving)/.test(b.textContent));b&&b.click();});await W(800);await pg.evaluate(()=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes('Tap again'));b&&b.click();});await W(2500);}};
