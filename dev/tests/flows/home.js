module.exports=async({pg,S,W})=>{await pg.click('#go');await W(1500);await pg.click('#actions >> text=Fly home');await W(18000);await S('h_day');
await pg.click('text=Make night');await W(5000);await S('h_dusk');await W(12000);await S('h_night');
await pg.click('#actions >> text=Make day');await W(12000);await pg.click('#actions >> text=Back to space');await W(19000);await S('h_lift');await W(8000);await S('h_space');};
