// Passport map: big pins, "?" on unvisited, tap Eiffel opens its tour.
module.exports=async({pg,S,W})=>{await pg.click('#go');await W(3000);await pg.keyboard.press('p');await W(1500);await S('pp0');
const pin=await pg.evaluate(()=>{const c=document.querySelector('#pmap'),r=c.getBoundingClientRect(),p=c.pins.find(p=>p.L.id==='eiffel'),k=r.width/c.width;return {x:r.left+p.x*k,y:r.top+(p.y-c.pr-2)*k,d:Math.round(2*c.pr*k)};});
console.log('pin px',pin.d);if(pin.d<40)throw new Error('pins too small');await pg.mouse.click(pin.x,pin.y);await W(9000);await S('pp1');
const st=await pg.evaluate(()=>window.__toyState());console.log('tour',st.tour);if(st.tour!=='eiffel')throw new Error('tap went to '+st.tour);
await pg.evaluate(()=>window.__toyGo(75,-40,1));await W(12000);await S('pp2_snow');};
