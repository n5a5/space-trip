// "Where am I?" titles at famous places and coasts (the kid saw "Atlantic Ocean" at Liberty and "Cuba" at Kennedy).
module.exports=async({pg,W})=>{await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(2500);await pg.click('.th[data-id="earth"]');   // tap Earth, then tap it again to open Explorer Earth
await W(9000);
const want={'Liberty':[40.69,-74.04,'New York'],'Kennedy':[28.57,-80.65,'Florida'],'Pyramids':[29.98,31.13,'Egypt'],'Eiffel':[48.86,2.29,'France'],'Opera House':[-33.86,151.21,'Australia'],'Big Ben':[51.5,-0.12,'United Kingdom'],'Miami coast':[25.77,-80.13,'Florida'],'mid-Atlantic':[30,-40,'Atlantic Ocean'],'mid-Pacific':[0,-150,'Pacific Ocean']};
const bad=[];for(const[k,[la,lo,n]]of Object.entries(want)){const got=await pg.evaluate(([la,lo])=>window.__whereName(la,lo),[la,lo]);console.log(k,got);if(got!==n)bad.push(k+': '+got);}
if(bad.length)throw new Error('wrong place names: '+bad.join('; '));};
