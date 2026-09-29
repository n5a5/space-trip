module.exports=async({pg,S,W,visit})=>{await pg.click('#go');await W(1500);await pg.click('.th[data-id=\"earth\"]');await W(11000);
await pg.click('#actions >> text=Places');await W(9000);await S('g_ksc');await visit('eiffel');await W(9000);await S('g_eiffel');
await pg.click('#actions >> text=Planets');await W(2000);await pg.click('text=Line up');await W(1500);await pg.click('.pl[data-id="mercury"]');await W(500);await S('g_parade');
await pg.click('#actions >> text=All planets');await W(1500);await pg.click('.th[data-id="moon"]');await W(4000);await pg.click('text=Jump!');await W(1500);await S('g_jump');await W(4000);
await pg.click('#actions >> text=All planets');await W(2500);await pg.click('#actions >> text=Fly home');await W(16000);
await pg.click("text=Tonight's sky");await W(9000);await S('g_sky');};
