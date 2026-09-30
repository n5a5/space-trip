// Music starts after Blast off; the plane and car make engine sounds; the start screen hides the title bar.
module.exports=async({pg,S,W})=>{await S('snd0_start');const vis=await pg.evaluate(()=>getComputedStyle(document.querySelector('#top')).visibility);console.log('top on start',vis);
await pg.click('#go');await W(3000);
const m=await pg.evaluate(()=>new Promise(r=>setTimeout(()=>r(window.__audioState?window.__audioState():null),1500)));console.log('audio',m);
await pg.click('.th[data-id="earth"]');await W(2500);await pg.click('.th[data-id="earth"]');   // tap Earth, then tap it again to open Explorer Earth
await W(10000);await pg.click('#actions >> text=Fly!');await W(4000);const fa=await pg.evaluate(()=>window.__audioState());console.log('fly',fa);if(!fa.music||!(fa.engine>0))throw new Error('no music or engine sound while flying');
await pg.goBack();await W(1500);await pg.click('#actions >> text=Drive!');await W(4000);console.log('drive',await pg.evaluate(()=>window.__audioState()));await pg.goBack();};
