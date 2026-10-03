// Lifecycle and device torture: hiding the app silences Luna and pauses sound (and it comes back); the WebGL context lost and restored in space and Explorer Earth keeps drawing;
// storage that is full or blocked (private browsing) never throws.
module.exports=async({pg,S,W})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
const hide=h=>pg.evaluate(h=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>h});Object.defineProperty(document,'visibilityState',{configurable:true,get:()=>h?'hidden':'visible'});document.dispatchEvent(new Event('visibilitychange'));},h);
const lum=async()=>{const b=await pg.screenshot({clip:{x:56,y:200,width:300,height:300}});return pg.evaluate(async a=>{const bm=await createImageBitmap(new Blob([new Uint8Array(a)],{type:'image/png'}));const c=new OffscreenCanvas(bm.width,bm.height),x=c.getContext('2d');x.drawImage(bm,0,0);const d=x.getImageData(0,0,c.width,c.height).data;let s=0,s2=0,n=0;for(let i=0;i<d.length;i+=16){const v=(d[i]+d[i+1]+d[i+2])/3;s+=v;s2+=v*v;n++}const m=s/n;return {mean:+m.toFixed(1),sd:+Math.sqrt(s2/n-m*m).toFixed(1)}},[...b])};
await pg.click('#go');await W(3000);
await pg.evaluate(()=>document.querySelector('#strip .th[data-id="saturn"]').click());await W(1500);
await hide(true);await W(800);const h=await pg.evaluate(()=>({cap:document.querySelector('#caption').textContent,a:window.__audioState().ctx}));console.log('hidden',JSON.stringify(h));
if(h.cap)throw new Error('Luna still talking while hidden');if(h.a==='running')throw new Error('sound still running while hidden');
await hide(false);await W(800);const v=await pg.evaluate(()=>window.__audioState().ctx);console.log('visible again',v);if(v==='suspended')throw new Error('sound did not come back');
for(const where of ['space','space','space','explorer']){if(where==='explorer'){await act('Explore Earth');await W(12000);}
  const before=await lum();const lost=await pg.evaluate(()=>{const c=document.querySelector('canvas');const g=c.getContext('webgl2')||c.getContext('webgl');const x=g&&g.getExtension('WEBGL_lose_context');if(!x)return false;window.__lc=x;x.loseContext();return true;});if(!lost){console.log('no lose_context here');continue;}
  await W(where==='space'?300:1500);await pg.evaluate(()=>window.__lc.restoreContext());await W(5000);const after=await lum();await S('lc_'+where);console.log(where,'picture before',JSON.stringify(before),'after restore',JSON.stringify(after));if(after.sd<before.sd*.4||after.mean<before.mean*.4)throw new Error('the picture did not come back after the context was restored in '+where);}
await pg.evaluate(()=>{const e=new DOMException('full','QuotaExceededError');Storage.prototype.setItem=function(){throw e;};});
await act('All planets');await W(1500);await act('Passport');await W(1500);await act('Close');await W(800);
await pg.addInitScript(()=>{Object.defineProperty(window,'localStorage',{configurable:true,get(){throw new DOMException('blocked','SecurityError');}});});await pg.reload();await W(4000);
await pg.click('#go');await W(3000);await pg.evaluate(()=>document.querySelector('#strip .th[data-id="mars"]').click());await W(4000);console.log('storage blocked: played on');};
