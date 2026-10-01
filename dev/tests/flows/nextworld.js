// After every rock on the Moon, a big button goes on to Europa (and the chain continues).
module.exports=async({pg,S,W})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
await pg.click('#go');await W(2500);await pg.click('.th[data-id="moon"]');await W(5000);await act('Walk on the Moon');await W(9000);
await pg.evaluate(()=>window.__moonFindAll());await W(3500);await S('next_btn');const labels=await pg.evaluate(()=>[...document.querySelectorAll('#actions .act')].map(b=>b.textContent));console.log('buttons',labels.join(' | '));
const fit=await pg.evaluate(()=>[...document.querySelectorAll('#actions .act')].every(b=>{const r=b.getBoundingClientRect();return r.bottom<=innerHeight+1&&r.right<=innerWidth+1&&r.left>=-1;}));if(!fit)throw new Error('buttons off screen');
await W(700);if(!(await act('Walk on Europa')))throw new Error('no next-world button');await W(9000);const pill=await pg.evaluate(()=>document.querySelector('#pill').textContent);console.log('now',pill);if(!/Europa/.test(pill))throw new Error('did not go to Europa');};
