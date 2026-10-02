// Who lives here? never offers a home the animal really lives in as a wrong answer (red-team finding: panda + Mountains)
module.exports=async({pg,S,W})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await pg.click('.th[data-id="earth"]');await W(12000);
await act('Games');await W(900);if(!(await act('Who lives here?')))throw new Error('no game');await W(1500);
let bad=[],n=0;for(let k=0;k<200;k++){const [an,right,opts,also]=await pg.evaluate(()=>window.__homesNext());n++;if(!opts.includes(right))bad.push(an+' missing right');for(const o of opts)if(o!==right&&also.includes(o))bad.push(an+' offered '+o);}
console.log('rounds',n,'bad',bad.length,bad.slice(0,5).join('; '));if(bad.length)throw new Error('true home offered as wrong: '+bad[0]);};
