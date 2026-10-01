// Pinch out while driving or flying zooms the chase camera out (and back in); desktop uses the mouse wheel. Steering is not changed by the pinch.
module.exports=async({pg,S,W})=>{const tap=s=>process.env.TOUCH?pg.tap(s):pg.click(s),z=()=>pg.evaluate(()=>window.__camZoom());
await tap('#go');await W(2000);await tap('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await tap('.th[data-id="earth"]');await W(11000);
await pg.evaluate(()=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes('Drive!'));b&&b.click();});await W(4000);await S('cz_near');
const vw=pg.viewportSize(),cx=vw.width/2,cy=vw.height*.45;
async function pinch(d0,d1){if(process.env.TOUCH){const c=await pg.context().newCDPSession(pg),pts=d=>[{x:cx-d/2,y:cy,id:1},{x:cx+d/2,y:cy,id:2}];
  await c.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:pts(d0)});for(let i=1;i<=10;i++){await c.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:pts(d0+(d1-d0)*i/10)});await W(40);}await c.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
 else{await pg.mouse.move(cx,cy);for(let i=0;i<8;i++){await pg.mouse.wheel(0,d1>d0?-100:100);await W(60);}}}
const z0=await z();await pinch(260,60);await W(2500);const z1=await z();const f=await pg.evaluate(()=>window.__fly());await S('cz_far');
await pinch(60,260);await W(1500);const z2=await z();console.log('zoom',z0,'-> fingers together',z1,'-> fingers apart',z2,'steer',f.sx,f.sy);
if(!(z1>z0*1.8))throw new Error('pinch out did not zoom out');if(!(z2<z1*.6))throw new Error('pinch in did not zoom back in');};
