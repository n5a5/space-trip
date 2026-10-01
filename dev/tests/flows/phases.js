// Moon phase machine: opens from the Moon, sliding the Moon round names each of the 8 phases, all 8 gives the sticker; Back returns to the Moon.
module.exports=async({pg,S,W})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t),ph=v=>pg.evaluate(v=>window.__phases(v),v);
await pg.click('#go');await W(2500);await pg.click('.th[data-id="moon"]');await W(5000);await W(700);if(!(await act('Moon phases')))throw new Error('no Moon phases button');await W(3000);await S('ph_new');
for(const v of [125,250,375,500,625,750,875,980]){await ph(v);await W(1500);if(v===250)await S('ph_firstq');if(v===375)await S('ph_gibbous');if(v===500)await S('ph_full');}
const st=await ph();console.log('phases',JSON.stringify(st));if(st.seen<8||!st.done)throw new Error('not all phases named');
await W(700);await act('Back to Moon');await W(3000);const m=await pg.evaluate(()=>window.__spaceState());console.log('back',JSON.stringify(m));if(m.current!=='moon')throw new Error('did not return to the Moon');};
