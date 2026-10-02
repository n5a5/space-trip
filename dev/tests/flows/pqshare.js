// Shared progress: the Reading Room reads Princess Quest's save on this device (read only). Sight words come from the words she is learning, sentences stay at her stage;
// a corrupt or missing save falls back to beginner words; Space Trip never changes Princess Quest's save; the grown-ups panel shows right-first-try by standard.
module.exports=async({pg,S,W,visit})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
const SAVE=JSON.stringify({schemaVersion:3,sightWords:{see:{box:2},go:{box:1},look:{box:3},the:{box:5}},subskills:{'decodable-reading':{stage:0},'add-sub':{stage:0}}});
const check=async(label,val,expect)=>{await pg.evaluate(v=>{if(v===null)localStorage.removeItem('arcade.v3');else localStorage.setItem('arcade.v3',v);},val);await pg.reload();await W(3000);
  const pq=await pg.evaluate(()=>window.__pq());console.log(label,JSON.stringify(pq));expect(pq);const after=await pg.evaluate(()=>localStorage.getItem('arcade.v3'));if(after!==val)throw new Error(label+': Princess Quest save was changed');};
await check('sample',SAVE,pq=>{if(!pq.found||pq.learning.sort().join()!=='go,look,see'||pq.known.join()!=='the'||pq.stage!=='a'||pq.addMax!==5)throw new Error('sample save read wrong');});
await check('corrupt','{not json',pq=>{if(pq.found)throw new Error('corrupt save should not be found');});
await check('wrong shape',JSON.stringify([1,2,3]),pq=>{if(pq.found)throw new Error('array save should not be found');});
await check('missing',null,pq=>{if(pq.found)throw new Error('missing save should not be found');});
await pg.evaluate(v=>localStorage.setItem('arcade.v3',v),SAVE);await pg.reload();await W(3000);
await pg.click('#go');await W(1500);await pg.click('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await pg.click('.th[data-id="earth"]');await W(11000);
await pg.click('#actions >> text=Places');await W(14000);await visit('college');await W(20000);await act('Reading Room');await W(4000);
let sights=0,sents=0,lastW=null;for(let r=0;r<12;r++){const q=await pg.evaluate(()=>window.__read());if(!q)break;
  if(q.exp==='sight'){sights++;if(!['see','go','look','the','I','a'].includes(q.ans))throw new Error('sight word '+q.ans+' is not from her progress');if(q.ans===lastW)throw new Error('same sight word twice in a row');lastW=q.ans;}
  if(q.exp==='sentence'){sents++;const t=await pg.evaluate(()=>document.querySelector('.rdS').textContent);console.log('sentence',t);}
  await pg.evaluate(a=>document.querySelector(`#qtray .pl[data-id="${a}"]`).click(),q.ans);await W(q.right===4?8200:4400);}
console.log('sight items',sights,'sentences',sents);if(!sights)throw new Error('no sight item seen');
await act('Back to campus');await W(1500);await pg.keyboard.press('p');await W(1500);await pg.evaluate(()=>document.querySelector('#pgrown').click());await W(1200);await S('pq_grown');const tbl=await pg.evaluate(()=>document.querySelector('#gcampus').innerText);console.log('grown-ups',tbl.replace(/\n/g,' | ').slice(0,300));if(!/Sight words|Rhymes|Reading|True stories/.test(tbl)||!/Princess Quest progress/.test(tbl))throw new Error('grown-ups campus table missing');
const after=await pg.evaluate(()=>localStorage.getItem('arcade.v3'));if(after!==SAVE)throw new Error('Princess Quest save was changed during play');
await pg.keyboard.press('Escape');await W(800);
await pg.evaluate(()=>localStorage.setItem('ast-campus',JSON.stringify({'ELA.K.F.1.4':[3,2],'MA.K.NSO.1.1':['<img src=x onerror="window.__xss=1">',1],'MA.K.GR.1.1':[2,9],junk:[1,1]})));
await pg.evaluate(()=>document.querySelector('#pgrown').click());await W(1200);const x=await pg.evaluate(()=>[window.__xss,document.querySelector('#gcampus').innerText,!!document.querySelector('#gcampus img')]);console.log('hostile record',JSON.stringify(x).slice(0,240));
if(x[0]||x[2])throw new Error('stored text ran as HTML');if(/9 of 2|onerror|junk/.test(x[1]))throw new Error('bad counts shown');
await pg.evaluate(()=>document.querySelector('#gcmp').click());await W(300);await pg.evaluate(()=>document.querySelector('#gcmp').click());await W(800);
const cleared=await pg.evaluate(()=>[localStorage.getItem('ast-campus'),document.querySelector('#gcampus').innerText]);console.log('after clear',JSON.stringify(cleared).slice(0,160));if(cleared[0]!==null||!/No Number Lab/.test(cleared[1]))throw new Error('Clear learning record did not clear');};
