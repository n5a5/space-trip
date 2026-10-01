// Moon walk: Jump! makes a big slow hop; Plant my flag puts a flag by her; after all ten rocks, New rocks starts a new hunt.
module.exports=async({pg,S,W})=>{const m=()=>pg.evaluate(()=>window.__moon()),act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
await pg.click('#go');await W(2500);await pg.click('.th[data-id="moon"]');await W(5000);await act('Walk on the Moon');await W(9000);
await W(700);await act('Jump!');let top=0;for(let i=0;i<60;i++){await W(300);const j=await m();if(j.y>top){top=j.y;if(top>5)await S('moon_jump');}if(!(j.jumpT>0)&&i>3)break;}console.log('jump peak',top);if(!(top>4))throw new Error('no big hop');
await W(2500);await act('Plant my flag');await W(2000);await S('moon_flag');if(!(await m()).flag)throw new Error('no flag');
await pg.evaluate(()=>window.__moonFindAll());await W(3000);const a=await m();console.log('after all',JSON.stringify(a));if(a.found!==a.n)throw new Error('rocks not all found');
await W(800);if(!(await act('New rocks')))throw new Error('no New rocks button');await W(1500);const b=await m();console.log('new hunt',JSON.stringify(b));if(b.found!==0)throw new Error('new hunt did not reset');await S('moon_new');};
