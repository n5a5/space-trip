// Kenney Cube Pets replace the hand-built elephant, giraffe, panda and polar bear; tapping one makes it dance.
module.exports=async({pg,S,W})=>{await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);await pg.click('.th[data-id="earth"]');await W(9000);
for(const [n,la,lo] of [['elephant',3,24],['giraffe',-7,33],['polar',74,-95]]){await pg.evaluate(([la,lo])=>window.__toyGo(la,lo,2),[la,lo]);await W(10000);await S('pet_'+n);}
const pets=await pg.evaluate(()=>window.__pets&&window.__pets());console.log('pets loaded',JSON.stringify(pets));if(!pets||pets.length<4)throw new Error('cube pets did not load: '+JSON.stringify(pets));};
