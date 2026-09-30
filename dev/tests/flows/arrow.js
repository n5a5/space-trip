// The goal chip's arrow agrees with the on-screen direction of the green 3D arrow (checked over flips and turns).
module.exports=async({pg,S,W})=>{await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await pg.click('.th[data-id="earth"]');await W(9000);
await pg.click('#actions >> text=Fly!');await W(2500);await pg.evaluate(()=>window.__mission());await W(1500);const bad=[];let n=0;
for(let i=0;i<10;i++){if(i%3===1)await pg.evaluate(()=>window.__flyFlip());await W(900);const r=await pg.evaluate(()=>window.__arrowCheck());if(!r)continue;n++;let d=Math.abs(((r.chip-r.scr)%360+540)%360-180);console.log('sample',i,JSON.stringify(r),'diff',d);if(d>45)bad.push(JSON.stringify(r));}
await S('arrow_check');if(n<5)throw new Error('too few samples');if(bad.length>1)throw new Error('chip disagrees with the 3D arrow: '+bad.join(' '));};
