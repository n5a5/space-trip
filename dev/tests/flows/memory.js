// Memory: 8 rounds of Earth → Fly → land → Stop → Moon walk → back; geometries/textures must not keep growing.
module.exports=async({pg,W})=>{const mem=()=>pg.evaluate(()=>JSON.parse(window.__mem().split(' ')[0]));const tap=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act, #strip .th, button')].find(b=>b.textContent.trim().includes(t));if(b)b.click();return !!b;},t);
await pg.click('#go');await W(2500);const seen=[];
for(let r=0;r<8;r++){await pg.waitForSelector('.th[data-id="earth"]',{state:'visible',timeout:60000});await pg.click('.th[data-id="earth"]');await W(2500);await pg.click('.th[data-id="earth"]');await W(5000);await tap('Fly!');await W(1500);await pg.evaluate(()=>window.__flyTo('taj'));await W(2500);await tap('Land');await W(2500);
  await pg.goBack();await W(2500);await tap('Planets');await W(2500);await pg.waitForSelector('.th[data-id="moon"]',{state:'visible',timeout:60000});await pg.click('.th[data-id="moon"]');await W(2500);await tap('Walk on the Moon');await W(4000);await pg.goBack();await W(2500);
  const m=await mem();seen.push(m);console.log('round',r,JSON.stringify(m));}
const g0=seen[2].geometries,g1=seen[7].geometries,t0=seen[2].textures,t1=seen[7].textures;console.log('geometries',g0,'->',g1,'textures',t0,'->',t1);
if(g1>g0*1.15+40||t1>t0*1.15+10)throw new Error('memory keeps growing: geometries '+g0+'→'+g1+', textures '+t0+'→'+t1);};
