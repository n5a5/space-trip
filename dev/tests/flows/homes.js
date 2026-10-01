// Who lives here? From Explorer Earth Games: an animal and three homes; a wrong tap says try again, the right one tells a fact; five right gives the sticker; Back to Earth returns.
module.exports=async({pg,S,W})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t),h=()=>pg.evaluate(()=>window.__homes());
await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await pg.click('.th[data-id="earth"]');await W(12000);
await act('Games');await W(900);if(!(await act('Who lives here?')))throw new Error('no Who lives here? button');await W(3000);await S('homes_ask');
for(let r=0;r<5;r++){const q=await h();if(!q)throw new Error('game not running');if(r===0){const wrong=await pg.evaluate(home=>{const b=[...document.querySelectorAll('#qtray .pl')].find(b=>b.dataset.id!==home);b.click();return b.dataset.id;},q.home);await W(1200);const q2=await h();if(q2.right!==0)throw new Error('wrong answer scored');}
  await pg.evaluate(home=>document.querySelector(`#qtray .pl[data-id="${home}"]`).click(),q.home);await W(1500);if(r===0)await S('homes_right');await W(r===4?9000:5000);}
const st=await pg.evaluate(()=>{try{return localStorage.getItem('ast-passport')||''}catch{return ''}});console.log('sticker',/homes/.test(st));if(!/homes/.test(st))throw new Error('no sticker');
await act('Back to Earth');await W(2000);const m=await pg.evaluate(()=>window.__toyState());console.log('back',JSON.stringify(m).slice(0,80));};
