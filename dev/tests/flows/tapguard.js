// Fast repeated taps: a tap within 400 ms of the buttons changing is ignored (no accidental Stop, no tap-through into new buttons).
module.exports=async({pg,W})=>{const f=()=>pg.evaluate(()=>window.__fly());await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);await pg.click('.th[data-id="earth"]');   // tap Earth, then tap it again to open Explorer Earth
await W(9000);
await pg.click('#actions >> text=Fly!');await W(3000);
const r=await pg.evaluate(async()=>{const tap=t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));if(b)b.click();return !!b;};
  tap('Stop flying');await new Promise(r=>setTimeout(r,80));const quick=tap('Tap again');await new Promise(r=>setTimeout(r,80));return {quick,still:!!window.__fly()};});
console.log('quick second tap found',r.quick,'still flying',r.still);if(!r.still)throw new Error('a tap 80 ms after the bar changed went through');
await W(700);await pg.evaluate(()=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes('Tap again'));b&&b.click();});await W(1500);
const after=await f();console.log('after a proper second tap, flying:',!!after);if(after)throw new Error('the real second tap did not stop');};
