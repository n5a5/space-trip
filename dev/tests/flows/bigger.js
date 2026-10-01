// Which is bigger? From Sizes: two same-size pictures, tap the really bigger one; the pictures change to true sizes; round 5 is Titan vs Mercury; five right gives the Size expert sticker.
module.exports=async({pg,S,W})=>{const g=()=>pg.evaluate(()=>window.__bigger()),act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
await pg.click('#go');await W(2500);await act('Sizes');await W(2500);await pg.click('#szgame');await W(3000);await S('big_ask');
for(let r=0;r<5;r++){const q=await g();console.log('round',r+1,JSON.stringify(q));if(!q)throw new Error('game not running');if(r===4&&!(q.pair.includes('titan')&&q.pair.includes('mercury')))throw new Error('round 5 is not Titan vs Mercury');
  await pg.evaluate(id=>document.querySelector(`#qtray .pl[data-id="${id}"]`).click(),q.big);await W(2000);if(r===0)await S('big_reveal');await W(r===4?8000:4000);}
const q=await g();console.log('after five',JSON.stringify(q));const st=await pg.evaluate(()=>{try{return localStorage.getItem('ast-passport')||''}catch{return ''}});console.log('stamps has bigger',/bigger/.test(st));};
