// Living world: flying near Cappadocia finds the hot-air balloons (spoken + sticker); the northern lights glow at night; Cube Pets load.
module.exports=async({pg,S,W})=>{await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);await pg.click('.th[data-id="earth"]');await W(9000);
await pg.click('#actions >> text=Fly!');await W(2500);await pg.evaluate(()=>window.__flyToLL(38.6,34.8));let seen=[];for(let i=0;i<20&&!seen.includes('balloon');i++){await W(500);seen=await pg.evaluate(()=>window.__wild());}
await S('wl_balloons');console.log('found',JSON.stringify(seen));if(!seen.includes('balloon'))throw new Error('balloons not found');
await pg.evaluate(()=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>/Stop flying/.test(b.textContent));b&&b.click();});await W(800);await pg.evaluate(()=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes('Tap again'));b&&b.click();});await W(2500);
await pg.evaluate(()=>window.__toyGo(62,-100,1));await W(10000);await pg.evaluate(()=>window.__sunNight());await W(6000);let au=0;for(let i=0;i<30&&au<.25;i++){await W(1000);au=await pg.evaluate(()=>window.__aurora());}await S('wl_aurora');console.log('aurora brightness',au);if(au<.25)throw new Error('northern lights not glowing at night');
console.log('pets',JSON.stringify(await pg.evaluate(()=>window.__pets())));};
