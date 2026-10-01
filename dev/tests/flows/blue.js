// Regression: Explorer Earth land must never come out ocean blue, even if the phone wiped the Earth canvas (MODE=wipe) or the land clip fails (MODE=clip).
module.exports=async({pg,S,W})=>{const tap=s=>process.env.TOUCH?pg.tap(s):pg.click(s),mode=process.env.MODE||'wipe';await tap('#go');await W(2000);
if(mode==='wipe')await pg.evaluate(()=>window.__wipeEarth());
if(mode==='clip')await pg.evaluate(()=>{const P=CanvasRenderingContext2D.prototype,oc=P.clip;window.__oc=oc;P.clip=function(){this.beginPath();this.rect(0,0,0,0);oc.call(this);};});
await tap('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await tap('.th[data-id="earth"]');await W(12000);
if(mode==='clip')await pg.evaluate(()=>{CanvasRenderingContext2D.prototype.clip=window.__oc;});
const px=await pg.evaluate(()=>[[39,-98],[15,20],[-25,134],[-10,-55]].map(([a,o])=>window.__toyLandPx(a,o)));console.log(mode,'land px',JSON.stringify(px));await S('blue_'+mode+(process.env.TAG||''));
const sea=px.filter(p=>!p||(p[2]>p[1]+25&&p[2]>p[0]+60));if(sea.length)throw new Error('land painted as sea at '+sea.length+' of 4 points');};
