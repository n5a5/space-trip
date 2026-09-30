// Landmark scene: find the three sparkles, then the picture quiz (one wrong tap, then all right) gives the Place quiz sticker.
module.exports=async({pg,S,W,visit})=>{await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);await pg.click('.th[data-id="earth"]');   // tap Earth, then tap it again to open Explorer Earth
await W(10000);
await visit('pyramids');await W(16000);let sp=await pg.evaluate(()=>window.__spots());for(const s of sp){await pg.mouse.click(s[0],s[1]);await W(1200);}
await W(1500);await pg.click('#actions >> text=Quiz');await W(2000);await S('pq0');
for(let i=0;i<3;i++){const q=await pg.evaluate(()=>window.__pquiz());console.log('q',JSON.stringify(q));if(i===0){await pg.click(`#actions >> text=${q.wrong}`);await W(1200);}
 await pg.click(`#actions >> text=${q.right}`);await W(2000);if(i===1)await S('pq1');}
const left=await pg.evaluate(()=>window.__pquiz());if(left)throw new Error('quiz did not finish');
const got=await pg.evaluate(()=>JSON.parse(localStorage.getItem('ast-passport')||'[]').includes('placequiz'));if(!got)throw new Error('no Place quiz sticker');console.log('sticker',got);};
