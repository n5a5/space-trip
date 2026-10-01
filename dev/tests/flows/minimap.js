// Corner map: a close-up around her that scrolls as she drives; tapping it shows the whole world and back. Car missions say "drive to".
module.exports=async({pg,S,W})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await pg.click('.th[data-id="earth"]');await W(11000);
await act('Drive!');await W(16000);await S('mm_near');const cap=await pg.evaluate(()=>document.querySelector('#say')?.textContent||'');console.log('caption',cap.slice(0,80));
const px=()=>pg.evaluate(()=>{const c=document.getElementById('minimap'),d=c.getContext('2d').getImageData(0,0,280,140).data;let s=0;for(let i=0;i<d.length;i+=40)s+=d[i]+d[i+1]*3+d[i+2]*7;return s;});
const a=await px();await pg.evaluate(()=>window.__driveTo(41.9,12.5));await W(2500);const b=await px();console.log('map changed as she moved',a!==b);if(a===b)throw new Error('minimap did not scroll');
await pg.click('#minimap');await W(800);await S('mm_world');await pg.click('#minimap');await W(800);
const lines=await pg.evaluate(()=>window.__allLines?window.__allLines().filter(l=>/Mission: drive to/.test(l)).length:0);console.log('drive-to lines',lines);if(!lines)throw new Error('no drive-to mission lines');};
