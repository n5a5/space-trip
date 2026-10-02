// Reading Room at Harvard: rhyme, first sound, sight word, decodable sentence and true story items; rhyme and first-sound questions say every choice aloud;
// the story question can't be answered by matching the story pictures; a wrong pick earns no star; five first-try answers give the sticker; Back to campus.
module.exports=async({pg,S,W,visit})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
await pg.click('#go');await W(1500);await pg.click('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await pg.click('.th[data-id="earth"]');await W(11000);
await pg.click('#actions >> text=Places');await W(14000);await visit('college');await W(22000);
if(!(await act('Reading Room')))throw new Error('no Reading Room button');await W(4000);
let q=await pg.evaluate(()=>window.__read());console.log('first',JSON.stringify(q));if(q.exp!=='rhyme')throw new Error('first item should be a rhyme');
for(const o of q.opts)if(!q.ask.toLowerCase().includes(o.toLowerCase()))throw new Error('choice not said aloud: '+o+' in "'+q.ask+'"');
const wrong=q.opts.find(o=>o!==q.ans);await pg.evaluate(w=>document.querySelector(`#qtray .pl[data-id="${w}"]`).click(),wrong);await W(1200);
await pg.evaluate(a=>document.querySelector(`#qtray .pl[data-id="${a}"]`).click(),q.ans);await W(4500);
const q2=await pg.evaluate(()=>window.__read());console.log('after wrong-then-right',q2.right);if(q2.right!==0)throw new Error('a fixed answer earned a star');
const kinds=new Set(['rhyme']);for(let r=0;r<10;r++){q=await pg.evaluate(()=>window.__read());if(!q)break;kinds.add(q.exp);if(r<6)await S('rd_'+q.exp);
  if(q.exp==='first'||q.exp==='rhyme')for(const o of q.opts)if(!q.ask.toLowerCase().includes(o.toLowerCase()))throw new Error(q.exp+' choice not said: '+o);
  if(q.exp==='story'){const strip=await pg.evaluate(()=>[...new Intl.Segmenter().segment(document.querySelector('.rdStory').textContent)].map(x=>x.segment)),pic=await pg.evaluate(a=>document.querySelector(`#qtray .pl[data-id="${a}"] .hem`).textContent,q.ans);if(strip.includes(pic))throw new Error('story answer picture is in the story strip');}
  console.log('item',q.exp,q.std,'ans',q.ans,'right',q.right);if(q.right>=5)break;await pg.evaluate(a=>document.querySelector(`#qtray .pl[data-id="${a}"]`).click(),q.ans);await W(q.right===4?8500:4600);}
const st=await pg.evaluate(()=>JSON.parse(localStorage.getItem('ast-passport')||'[]'));console.log('kinds',[...kinds].join(' '),'reading sticker',st.includes('reading'));if(!st.includes('reading'))throw new Error('no Reading Room sticker');
await act('Back to campus');await W(2000);const back=await pg.evaluate(()=>document.querySelector('#quiz').hidden);if(!back)throw new Error('Back to campus failed');};
