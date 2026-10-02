// Sound off: games show Luna's words under the answers (never over the game); with sound on they stay hidden. Riddles' four answers fit on a small phone.
module.exports=async({pg,S,W})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
await pg.click('#go');await W(2500);await act('Riddles');await W(3000);
const fit=await pg.evaluate(()=>{const q=document.querySelector('#quiz').getBoundingClientRect();return [...document.querySelectorAll('#qtray .pl')].every(b=>b.getBoundingClientRect().bottom<=q.bottom+1);});console.log('riddle answers fit',fit);await S('mc_riddles');if(!fit)throw new Error('riddle answers cut off');
const on=await pg.evaluate(()=>document.querySelector('#qcap').textContent);if(on)throw new Error('caption under answers while sound is on');
await pg.click('#mutebtn');await W(500);await act('Again');await W(1200);
const r=await pg.evaluate(()=>{const c=document.querySelector('#qcap'),q=document.querySelector('#quiz').getBoundingClientRect(),cr=c.getBoundingClientRect(),t=document.querySelector('#qtray').getBoundingClientRect();return {text:c.textContent,below:cr.top>=t.bottom-1,inside:cr.bottom<=q.bottom+1||document.querySelector('#quiz').scrollHeight>document.querySelector('#quiz').clientHeight};});
console.log('muted caption',JSON.stringify(r));await S('mc_muted');if(!r.text||!r.below)throw new Error('muted caption missing or not under the answers');};
