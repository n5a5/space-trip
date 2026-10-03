// Tapping Blast off! while the 3D world is still being set up: the button says it heard her ("Getting ready…"), then the trip starts by itself (or asks once more if it took long).
module.exports=async({pg,S,W})=>{const cdp=await pg.context().newCDPSession(pg);await cdp.send('Emulation.setCPUThrottlingRate',{rate:6});await pg.reload();await pg.waitForSelector('#go',{state:'visible',timeout:60000});await pg.click('#go');
const t=await pg.evaluate(()=>document.querySelector('#go').textContent);console.log('right after the tap',t);
const ready=await pg.evaluate(()=>!!window.__q);if(!ready&&!/Getting ready/.test(t))throw new Error('an early tap gave no sign it was heard');
await pg.waitForFunction(()=>window.__q,null,{timeout:180000,polling:250});await W(2500);
const st=await pg.evaluate(()=>({start:!document.querySelector('#start').hidden,label:document.querySelector('#go').textContent,ready:document.querySelector('#go').classList.contains('ready')}));console.log('after set-up',JSON.stringify(st),'was ready at tap:',ready);
if(st.start&&!st.ready)throw new Error('the early tap was lost: still on the start card with no prompt');if(ready)throw new Error('set-up was already done at the tap, so this proves nothing');await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});};
