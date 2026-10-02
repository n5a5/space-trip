// Walks start with Amelia in view at once (the camera no longer drifts in from space), no hop carried over from the last walk, and the gem counter below the caption.
module.exports=async({pg,S,W})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
await pg.click('#go');await W(2500);
for(const w of ['europa','titan']){await pg.click(`.th[data-id="${w}"]`);await W(5700);if(!(await act('Walk on')))throw new Error('no Walk on for '+w);await W(300);
  const a=await pg.evaluate(()=>window.__amOn());console.log(w,'amelia',JSON.stringify(a));await S('ws_'+w);if(!a||!a.on||a.d>14)throw new Error('Amelia not in view at the start of '+w+': '+JSON.stringify(a));
  const ov=await pg.evaluate(()=>{const c=document.querySelector('#caption').getBoundingClientRect(),r=document.querySelector('#rockct').getBoundingClientRect();return {cb:c.bottom,ct:c.top,cl:c.left,rt:r.top,rr:r.right,txt:document.querySelector('#caption').textContent.length}});console.log('overlap',JSON.stringify(ov));
  if(ov.txt&&ov.rt<ov.cb-1&&ov.rr>ov.cl)throw new Error('gem counter under the caption');
  if(w==='europa'){await W(1500);await act('Jump!');await W(500);}
  const j=await pg.evaluate(()=>window.__moon());if(w==='titan'&&j.jumpT>0)throw new Error('a hop carried over into '+w);
  await act('Back to space');await W(5000);}};
