module.exports=async({pg,S,W})=>{await S('c_start');await pg.click('#go');await W(1500);
const log=[];
for(let i=0;i<30;i++){
  const btns=await pg.$$eval('#actions button:not([hidden]), #strip .th, #wstrip .th, #qtray .pl, #tray .pl',bs=>bs.filter(b=>b.offsetParent).map((b,k)=>k));
  const all=await pg.$$('#actions button, #strip .th, #wstrip .th, #qtray .pl, #tray .pl');
  const vis=[];for(const b of all){if(await b.isVisible())vis.push(b);}
  if(!vis.length){await W(1500);continue;}
  const b=vis[Math.floor(Math.random()*vis.length)];const t=(await b.innerText()).replace(/\s+/g,' ');log.push(t);
  await b.click({timeout:3000}).catch(()=>{});await W(1200+Math.random()*2500);
  if(await pg.$eval('#passport',e=>!e.hidden))await pg.click('#pclose');
  if(await pg.$eval('#amcard',e=>!e.hidden)){const m=await pg.evaluate(()=>document.querySelector('#pill').textContent);log.push('[card@'+m+']');}
}
await S('c_end');console.log(log.join(' | '));};
