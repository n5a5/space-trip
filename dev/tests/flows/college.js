// MIT and Harvard (Cambridge): the place is in Places; its scene has a Number Lab of mixed experiments (count, one more/less, add/take away, countdown, shapes, taller/shorter);
// a first miss dims that choice and asks again (the answer glows only after a second miss); stars are for first tries; five right gives the sticker; Back to campus.
module.exports=async({pg,S,W,visit})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
await pg.click('#go');await W(1500);await pg.click('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await pg.click('.th[data-id="earth"]');await W(11000);
await pg.click('#actions >> text=Places');await W(14000);await visit('college');await W(22000);await S('co_site');
const pill=await pg.evaluate(()=>document.querySelector('#pill').textContent);console.log('pill',pill);
if(!(await act('Number Lab')))throw new Error('no Number Lab button');await W(4000);
let q=await pg.evaluate(()=>window.__lab());console.log('lab',JSON.stringify(q));if(q.exp!=='count')throw new Error('first experiment should be counting');
const stars=await pg.evaluate(()=>[...document.querySelectorAll('.tenf span')].filter(s=>s.textContent).length);if(stars!==q.n)throw new Error('ten-frame shows '+stars+' not '+q.n);
const wrong=await pg.evaluate(a=>[...document.querySelectorAll('#qtray .pl')].map(b=>b.dataset.id).find(k=>k!==a),q.ans);await pg.evaluate(w=>document.querySelector(`#qtray .pl[data-id="${w}"]`).click(),wrong);await W(1200);
const q2=await pg.evaluate(()=>window.__lab());if(q2.right!==0)throw new Error('wrong scored');const fb=await pg.evaluate(([a,w])=>[document.querySelector(`#qtray .pl[data-id="${w}"]`).classList.contains('out'),document.querySelector(`#qtray .pl[data-id="${a}"]`).classList.contains('hint')],[q.ans,wrong]);console.log('first miss: wrong dimmed',fb[0],'answer glows',fb[1]);if(!fb[0]||fb[1])throw new Error('first miss should dim the choice and not show the answer');
const kinds=new Set();for(let r=0;r<8;r++){q=await pg.evaluate(()=>window.__lab());if(!q)break;kinds.add(q.exp);if(r>0&&r<6)await S('co_exp_'+q.exp);
  const opts=await pg.evaluate(()=>[...document.querySelectorAll('#qtray .pl')].map(b=>b.dataset.id));if(!opts.includes(q.ans))throw new Error(q.exp+': right answer missing from choices '+opts);
  console.log('exp',q.exp,q.std,'ans',q.ans,'opts',opts.join(','),'right',q.right);if(q.right>=5)break;await pg.evaluate(a=>document.querySelector(`#qtray .pl[data-id="${a}"]`).click(),q.ans);await W(q.right===4?8200:4200);}
await W(3000);const st=await pg.evaluate(()=>JSON.parse(localStorage.getItem('ast-passport')||'[]'));console.log('kinds',[...kinds].join(' '),'numberlab sticker',st.includes('numberlab'));if(!st.includes('numberlab'))throw new Error('no Number Lab sticker');
await act('Back to campus');await W(2000);const back=await pg.evaluate(()=>[document.querySelector('#pill').textContent,document.querySelector('#quiz').hidden]);console.log('back',back);if(!back[1]||!/MIT/.test(back[0]))throw new Error('Back to campus failed');};
