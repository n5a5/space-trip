// Drive: the title shows the country; a jump ramp ahead launches the car.
module.exports=async({pg,S,W})=>{const f=()=>pg.evaluate(()=>window.__fly());await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(10000);
await pg.click('#actions >> text=Drive!');await W(3000);await pg.evaluate(()=>window.__flyTo('colosseum'));await W(3000);console.log('where',await pg.evaluate(()=>document.querySelector('#pill').textContent));await S('rp0');
let ok=false;for(let i=0;i<6&&!ok;i++){ok=await pg.evaluate(()=>window.__rampAhead());await W(700);}console.log('ramp found',ok);await S('rp1');
let air=false;for(let i=0;i<12;i++){const s=await f();if(s.air||s.jumps>0){air=true;break;}await W(300);}await S('rp2');console.log('jump',air,JSON.stringify(await f()).slice(0,60));if(!air)throw new Error('no ramp jump');};
