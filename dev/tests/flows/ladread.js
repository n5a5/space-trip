// Reading Room ladder: three first-try rights climb the rhyme rung; Princess Quest progress only picks the starting rung (sight words: primer once 30 pre-primer words are known; sentences; adding) and never caps a saved one; its save is never written.
module.exports=async({pg,S,W,visit})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t),L=()=>pg.evaluate(()=>window.__ladder()),now=()=>pg.evaluate(()=>window.__labNow());
const tap=id=>pg.evaluate(id=>{const b=document.querySelector(`#qtray .pl[data-id="${id}"]`);b&&b.click();return !!b},id);
const next=async()=>{for(let i=0;i<50;i++){await W(400);const n=await now();if(n&&!(await pg.evaluate(()=>!!document.querySelector('#qtray .pl.hint'))))return n;}throw new Error('no next item');};
await pg.click('#go');await W(1500);await pg.click('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await pg.click('.th[data-id="earth"]');await W(11000);
await pg.click('#actions >> text=Places');await W(14000);await visit('college');await W(22000);
if(!(await act('Reading Room')))throw new Error('no Reading Room');await W(5000);await pg.evaluate(()=>window.__labOrder(['rhyme']));
let n=await now();if(n.exp!=='rhyme'||n.rung!==0)throw new Error('should start at rhyme rung 0: '+JSON.stringify(n));
for(let k=0;k<3;k++){await W(700);n=await now();await tap(n.ans);await next();}let l=await L();console.log('rhyme',JSON.stringify(l.rhyme));if(l.rhyme.r!==1)throw new Error('rhyme did not climb');await S('lr_up');
const PQ=JSON.stringify({schemaVersion:3,sightWords:{went:{box:2},see:{box:5}},subskills:{'decodable-reading':{stage:2},'add-sub':{stage:1}}});
await pg.evaluate(v=>{localStorage.setItem('arcade.v3',v);localStorage.removeItem('ast-ladder');},PQ);
const r=await pg.evaluate(()=>['sight','sentence','add','count'].map(k=>window.__rungOf(k)));console.log('start rungs from PQ',r.join(','));if(r.join()!=='0,2,1,0')throw new Error('PQ starting rungs wrong: '+r);
const PQ30=JSON.stringify({schemaVersion:3,sightWords:Object.fromEntries(['a','and','away','big','blue','can','come','down','find','for','funny','go','help','here','I','in','is','it','jump','little','look','make','me','my','not','one','play','red','run','said'].map(w=>[w,{box:5}]))});await pg.evaluate(v=>{localStorage.setItem('arcade.v3',v);localStorage.removeItem('ast-ladder');},PQ30);const r30=await pg.evaluate(()=>window.__rungOf('sight'));console.log('30 pre-primer words known: sight rung',r30);if(r30!==1)throw new Error('30 known pre-primer words should start on primer');await pg.evaluate(v=>{localStorage.setItem('arcade.v3',v);localStorage.removeItem('ast-ladder');},PQ);
await pg.evaluate(()=>localStorage.setItem('ast-ladder',JSON.stringify({sight:{r:0,s:0,h:[]},sentence:{r:3,s:0,h:[]}})));
const r2=await pg.evaluate(()=>['sight','sentence'].map(k=>window.__rungOf(k)));console.log('saved rungs win',r2.join(','));if(r2.join()!=='0,3')throw new Error('PQ overrode a saved rung: '+r2);
if(await pg.evaluate(()=>localStorage.getItem('arcade.v3'))!==PQ)throw new Error('Princess Quest save was changed');
await pg.evaluate(()=>{localStorage.removeItem('arcade.v3');localStorage.removeItem('ast-ladder');});};
