// The Tonight's Sky card must not hide the sky: it shrinks to one line while pointing and after a while, and a tap opens it again.
module.exports=async({pg,S,W})=>{const act=t=>pg.evaluate(t=>{const b=[...document.querySelectorAll('#actions .act')].find(b=>b.textContent.includes(t));b&&b.click();return !!b;},t);
const h=()=>pg.evaluate(()=>{const c=document.querySelector('#skycard');return c.hidden?0:c.getBoundingClientRect().height;});
await pg.click('#go');await W(2000);if(!(await act('Fly home'))){await act('Planets');await W(1500);}await W(1500);await act('Fly home');await W(16000);
await pg.click("text=Tonight's sky");await W(3000);const h0=await h();await S('sky_card_open');
await W(12000);const h1=await h();await S('sky_card_mini');await pg.click('#skycard');await W(600);const h2=await h();
if(process.env.TOUCH){await act('Point my phone');await W(800);}const h3=await h();
console.log('card heights open',h0,'later',h1,'tapped',h2,'pointing',h3);
if(!(h0>80))throw new Error('card not shown fully at first');if(!(h1<40))throw new Error('card did not shrink');if(!(h2>80))throw new Error('tap did not reopen the card');if(process.env.TOUCH&&!(h3<40))throw new Error('card not shrunk while pointing');};
