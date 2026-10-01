// Tonight's Sky looking at the house: no blown-out glare (few pure-white pixels).
module.exports=async({pg,S,W})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
await pg.click('#go');await W(2000);if(!(await act('Fly home'))){await act('Planets');await W(1500);}await W(1500);await act('Fly home');await W(16000);
await pg.click("text=Tonight's sky");await W(4000);
const meas=async()=>{const buf=await pg.screenshot();return pg.evaluate(async b64=>{const im=new Image();im.src='data:image/png;base64,'+b64;await im.decode();const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);const d=g.getImageData(0,Math.floor(im.height*.2),im.width,Math.floor(im.height*.55)).data;let n=0,w=0;for(let i=0;i<d.length;i+=8){n++;if(d[i]>240&&d[i+1]>225&&d[i+2]>170)w++;}return w/n;},buf.toString('base64'));};
let worst=0,wa=0;for(let a=0;a<360;a+=45){await pg.evaluate(a=>window.__skyLook(a,8),a);await W(1500);const f=await meas();if(f>worst){worst=f;wa=a;}}
await pg.evaluate(a=>window.__skyLook(a,8),wa);await W(1500);await S('skyglare');console.log('worst blown-out fraction',worst.toFixed(3),'at az',wa);if(worst>.05)throw new Error('house glare: '+(worst*100).toFixed(1)+'% blown out');};
