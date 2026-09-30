// Landmark scenes: three tappable sparkles each speak a fact; finding all three says well done.
module.exports=async({pg,S,W,visit})=>{await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);await pg.click('.th[data-id="earth"]');   // tap Earth, then tap it again to open Explorer Earth
await W(10000);
for(const id of ['eiffel','taj']){await visit(id);await W(16000);let sp=await pg.evaluate(()=>window.__spots());console.log(id,JSON.stringify(sp));await S('sp_'+id);
 for(const s of sp||[]){await pg.mouse.click(s[0],s[1]);await W(1500);sp=await pg.evaluate(()=>window.__spots());}
 if(!sp||sp.length!==3||!sp.every(x=>x[2]))throw new Error(id+': not all sparkles found '+JSON.stringify(sp));console.log('after',JSON.stringify(sp),await pg.evaluate(()=>document.querySelector('#caption').textContent.slice(0,80)));await S('sp_'+id+'_done');await pg.click('#actions >> text=Map');await W(7000);}};
