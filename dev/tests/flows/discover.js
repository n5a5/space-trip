// Explorer Earth discoveries: the Hawaiian volcano erupts when tapped; zebra and bison herds; the Kennedy rocket lifts off.
module.exports=async({pg,S,W})=>{await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(11000);
await pg.click('#tstrip >> text=Africa');await W(3000);await pg.evaluate(()=>window.__toyGo&&window.__toyGo(-2.3,34.8,2));await W(9000);await S('ds_zebra');
let p=await pg.evaluate(()=>window.__toyScr('animal','zebra'));console.log('zebra',p);if(p[2]){await pg.mouse.click(p[0],p[1]);await W(2500);}
await pg.evaluate(()=>window.__toyGo(19.4,-155.3,2));await W(22000);p=await pg.evaluate(()=>window.__toyScr('animal','volcano'));console.log('volcano',p);
if(!p[2])throw new Error('volcano not on screen');await pg.mouse.click(p[0],p[1]);await W(1200);await S('ds_erupt');console.log('pill',await pg.evaluate(()=>document.querySelector('#pill').textContent));
await pg.evaluate(()=>window.__toyGo(28.57,-80.65,3));await W(12000);await S('ds_ksc');};
