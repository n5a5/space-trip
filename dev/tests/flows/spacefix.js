// Space fixes: Moon boot prints land where she walks; riddles keep matching their pictures after the fifth star; the Eclipse machine opened from the Sun goes back to the Sun.
module.exports=async({pg,S,W})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t),st=()=>pg.evaluate(()=>window.__spaceState());
await pg.click('#go');await W(2500);
// riddles
await act('Riddles');await W(2500);for(let k=0;k<6;k++){let q=await pg.evaluate(()=>window.__quizState());if(k===5){await W(6000);q=await pg.evaluate(()=>window.__quizState());console.log('after 5 stars',JSON.stringify(q));if(!q.tray.includes(q.ans))throw new Error('riddle pictures do not match after five stars');break;}
  await pg.evaluate(a=>document.querySelector(`#qtray .pl[data-id="${a}"]`).click(),q.ans);await W(k===4?1500:3200);}
await act('All planets');await W(2500);
// eclipse from the Sun
await pg.click('.th[data-id="sun"]');await W(5000);await act('Eclipse');await W(3000);await S('ecl_sun');const lbl=await pg.evaluate(()=>[...document.querySelectorAll('#actions .act')].map(b=>b.textContent).join(','));console.log('eclipse buttons',lbl);
await act('Back to');await W(4000);const e=await st();console.log('after eclipse',JSON.stringify(e));if(e.current!=='sun')throw new Error('eclipse did not go back to the Sun');
// moon walk prints
await pg.click('.th[data-id="moon"]');await W(5000);await act('Walk on the Moon');await W(9000);await pg.keyboard.down('ArrowUp');await W(5000);await pg.keyboard.up('ArrowUp');await W(500);await S('moonprints');
const d=await pg.evaluate(()=>window.__tracksCheck());console.log('last print distance from Amelia',d);if(d===null||d>3)throw new Error('boot prints are not where she walks: '+d);};
