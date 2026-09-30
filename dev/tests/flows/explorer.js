module.exports=async({pg,S,W})=>{const st=()=>pg.evaluate(()=>window.__toyState());
await pg.click('#go');await W(3000);await pg.click('.th[data-id="earth"]');await W(2500);await pg.click('.th[data-id="earth"]');   // tap Earth, then tap it again to open Explorer Earth
await W(11000);await S('t2_far');console.log('far',JSON.stringify(await st()));
// tap the middle of the planet: fly + name
await pg.mouse.click(206,330);await W(6000);await S('t2_tap1');console.log('tap1',JSON.stringify(await st()));
await pg.click('#tzin');await W(6000);await S('t2_zoomin');console.log('zoomin',JSON.stringify(await st()));
await pg.click('#tzout');await W(5000);await pg.click('#tzout');await W(5000);
// places bar: Australia, then tap the kangaroo
await pg.click('#tstrip >> text=Australia');await W(7000);await S('t2_aus');
let p=await pg.evaluate(()=>window.__toyScr('animal','kangaroo'));console.log('roo',p);if(p[2]){await pg.mouse.click(p[0],p[1]);await W(5000);await S('t2_roo');console.log('roo tap',JSON.stringify(await st()));}
// star hunt: tap two stars
await pg.click('#actions >> text=Games');await W(600);await pg.click('#actions >> text=Star hunt');await W(6000);await S('t2_stars');
for(let n=0;n<2;n++){const all=await pg.evaluate(()=>[...Array(10)].map((_,i)=>window.__toyScr('star',i)));const i=all.findIndex(a=>a[2]&&a[0]>20&&a[0]<392&&a[1]>90&&a[1]<600);console.log('star',i,all[i]);if(i<0)break;await pg.mouse.click(all[i][0],all[i][1]);await W(6000);}
await S('t2_star_found');console.log('hunt',JSON.stringify(await st()));
await pg.click('#actions >> text=Hint');await W(6000);await S('t2_hint');
// build mode: zoom to Africa and tap land three times
await pg.click('#tstrip >> text=Africa');await W(6000);await pg.click('#actions >> text=Build');await W(4000);
for(const [x,y] of [[206,380],[180,400],[230,360]]){await pg.mouse.click(x,y);await W(800);}
await pg.click('#actions >> text=House');await pg.mouse.click(200,420);await W(800);await pg.click('#actions >> text=Flowers');await pg.mouse.click(215,400);await W(3000);await S('t2_build');console.log('build',JSON.stringify(await st()));
await pg.click('#actions >> text=Done');await W(1000);
// animals from the places bar
await pg.click('#tstrip >> text=Asia');await W(7000);await S('t2_asia');
await pg.click('#actions >> text=Games');await W(600);await pg.click('#actions >> text=Rides');await W(800);await pg.click('#actions >> text=Plane');await W(7000);await S('t2_plane');await pg.click('#actions >> text=Stop ride');await W(2000);
await pg.click('#actions >> text=Real Earth');await W(4000);};
