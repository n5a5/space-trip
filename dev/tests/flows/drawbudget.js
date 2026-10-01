// Performance budget: Explorer Earth draws only what can be seen (horizon culling). Globe view under 450 objects, driving under 600.
module.exports=async({pg,S,W})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
const count=()=>pg.evaluate(()=>window.__drawBreakdown().reduce((a,[,n])=>a+n,0));
await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await pg.click('.th[data-id="earth"]');await W(12000);
const g=await count();await act('Drive!');await W(8000);const d=await count();console.log('globe',g,'drive',d);if(g>450||d>600)throw new Error('over the draw budget: globe '+g+', drive '+d);};
