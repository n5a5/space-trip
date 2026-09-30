// Weather: rain clouds over the globe, a rainbow in the Amazon, snow near the poles.
module.exports=async({pg,S,W})=>{await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);await pg.click('.th[data-id="earth"]');   // tap Earth, then tap it again to open Explorer Earth
await W(12000);await S('wx0_globe');
await pg.evaluate(()=>window.__toyGo(2,-58,2));await W(14000);await S('wx1_rainbow');await pg.evaluate(()=>window.__toyGo(72,-40,1));await W(14000);await S('wx2_snow');};
