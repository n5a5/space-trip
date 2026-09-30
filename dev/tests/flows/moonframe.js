// Moon walk on a short phone screen: Amelia's feet stay above the GO pad (the pad used to cover her).
module.exports=async({pg,S,W})=>{await pg.setViewportSize({width:412,height:690});await W(800);await pg.click('#go');await W(2000);await pg.click('.th[data-id="moon"]');await W(4000);
await pg.click('#actions >> text=Walk on the Moon');let f=null;for(let i=0;i<12;i++){await W(1500);f=await pg.evaluate(()=>window.__marsFrame());if(f&&f.feet<f.pad-20)break;}
await S('mf0');console.log('frame',JSON.stringify(f));if(!f||f.feet>f.pad-20)throw new Error('Amelia hidden behind the pad: '+JSON.stringify(f));};
