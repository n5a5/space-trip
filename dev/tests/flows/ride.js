// Amelia rides in the open-top car, the boat and the plane's open cockpit; she waves near a landmark.
module.exports=async({pg,S,W})=>{const tap=s=>process.env.TOUCH?pg.tap(s):pg.click(s);await tap('#go');await W(2000);await tap('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await tap('.th[data-id="earth"]');await W(9000);
await tap('#actions >> text=Drive!');await W(5000);await S('ride_car');await pg.evaluate(()=>window.__flyTo('liberty'));await W(4000);await S('ride_car_wave');
await pg.evaluate(()=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>/Stop driving/.test(b.textContent));b&&b.click();});await W(800);await pg.evaluate(()=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes('Tap again'));b&&b.click();});await W(2500);
await tap('#actions >> text=Fly!');await W(5000);await S('ride_plane');};
