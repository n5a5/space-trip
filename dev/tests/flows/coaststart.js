// Drive! started while looking at a coast (Kennedy, Miami, Havana, Sydney) begins on land, not in the sea as a boat.
module.exports=async({pg,S,W})=>{const f=()=>pg.evaluate(()=>window.__fly());await pg.click('#gotoy');await W(8000);const bad=[];
for(const [n,la,lo] of [['Kennedy',28.52,-80.55],['Miami',25.77,-80.1],['Havana',23.14,-82.36],['Sydney',-33.86,151.28]]){
  await pg.evaluate(([la,lo])=>window.__toyGo(la,lo,2),[la,lo]);await W(6000);await pg.click('#actions >> text=Drive!');let boat=0;
  for(let i=0;i<5;i++){await W(600);if((await f()).boat)boat++;}const s=await f();console.log(n,s.where,'car at',JSON.stringify(await pg.evaluate(()=>window.__flyLL())),'boat frames',boat);if(boat)bad.push(n);
  await pg.click('#actions >> text=Stop driving');await W(400);await pg.click('#actions >> text=Tap again');await W(2500);}
await S('kd0');if(bad.length)throw new Error('Drive! began in the sea at '+bad.join(', '));};
