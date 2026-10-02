// Pluto: a dwarf planet past Neptune (label says so), Charon goes round it, "Is it a planet?" teaches the three checks; riddles never offer Pluto as a planet.
module.exports=async({pg,S,W})=>{await pg.click('#go');await W(3000);await S('pl_overview');
const lbl=await pg.evaluate(()=>{const b=document.querySelector('#strip .th[data-id="pluto"]');return b&&b.textContent});console.log('strip',lbl);if(!/dwarf/.test(lbl||''))throw new Error('Pluto strip button does not say dwarf');
await pg.evaluate(()=>document.querySelector('#strip .th[data-id="pluto"]').click());await W(5000);await S('pl_focus');
const pill=await pg.evaluate(()=>document.querySelector('#pill').textContent);console.log('pill',pill);if(!/Pluto · dwarf planet/.test(pill))throw new Error('pill: '+pill);
const pos=await pg.evaluate(()=>window.__pos());console.log('pos',pos.filter(x=>/pluto|charon/.test(x)).join(' '));
const btns=await pg.evaluate(()=>[...document.querySelectorAll('#actions .act')].map(b=>b.textContent.trim()));console.log('buttons',btns.join(' | '));
if(!btns.some(t=>/Is it a planet/.test(t)))throw new Error('no Is it a planet? button');
await pg.evaluate(()=>[...document.querySelectorAll('#actions .act')].find(b=>/Is it a planet/.test(b.textContent)).click());await W(6500);await S('pl_isp');
let q=await pg.evaluate(()=>window.__isp());console.log('round',JSON.stringify(q));
const wrong=Object.keys({planet:1,dwarf:1,moon:1}).find(k=>k!==q.ans);await pg.evaluate(w=>document.querySelector(`#qtray .pl[data-id="${w}"]`).click(),wrong);await W(900);
const q2=await pg.evaluate(()=>window.__isp());if(q2.right!==0)throw new Error('wrong answer scored');
const glow=await pg.evaluate(a=>document.querySelector(`#qtray .pl[data-id="${a}"]`).classList.contains('hint'),q.ans);if(!glow)throw new Error('first miss did not glow the right answer');
for(let r=0;r<6;r++){q=await pg.evaluate(()=>window.__isp());if(!q)break;console.log('ask',q.id,q.ans,'right',q.right);await pg.evaluate(a=>document.querySelector(`#qtray .pl[data-id="${a}"]`).click(),q.ans);await W(r===0?4800:4800);if(r===0)await S('pl_isp_right');}
await W(4000);const st=await pg.evaluate(()=>JSON.parse(localStorage.getItem('ast-passport')||'[]'));console.log('stamp isplanet',st.includes('isplanet'),'p:pluto',st.includes('p:pluto'));
if(!st.includes('isplanet'))throw new Error('no Pluto pal sticker after five right');
await pg.evaluate(()=>[...document.querySelectorAll('#actions .act')].find(b=>/Back to Pluto/.test(b.textContent)).click());await W(2500);
const back=await pg.evaluate(()=>[document.querySelector('#pill').textContent,document.querySelector('#quiz').hidden]);console.log('back',back);if(!/Pluto/.test(back[0])||!back[1])throw new Error('Back to Pluto failed');
await pg.evaluate(()=>[...document.querySelectorAll('#actions .act')].find(b=>/All planets/.test(b.textContent)).click());await W(2500);
const seen=new Set();for(let k=0;k<4;k++){await pg.evaluate(()=>[...document.querySelectorAll('#actions .act')].find(b=>/Riddles/.test(b.textContent)).click());await W(1500);(await pg.evaluate(()=>[...document.querySelectorAll('#qtray .pl')].map(b=>b.dataset.id))).forEach(x=>seen.add(x));await pg.goBack();await W(1500);}
console.log('riddle options',[...seen].join(' '));if(seen.has('pluto')||seen.has('charon'))throw new Error('riddles offered Pluto/Charon');
const lines=await pg.evaluate(()=>window.__allLines().filter(l=>/Pluto|Charon|Ceres|dwarf/.test(l)).length);console.log('pluto lines',lines);};
