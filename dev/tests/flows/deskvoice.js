// Desktop says "click"/"scroll"; phones keep "tap"/"swipe" (the recorded line is picked to match the device).
module.exports=async({pg,S,W})=>{await pg.click('#go');await W(4000);
const r=await pg.evaluate(()=>[window.__voicePick('Tap again to stop.'),window.__voicePick('Here are the planets at their real sizes, side by side! Swipe to see them all, and tap one to hear about it.')]);console.log(process.env.TOUCH?'phone':'desktop',JSON.stringify(r));
if(process.env.TOUCH){if(!/Tap/.test(r[0]))throw new Error('phone should say tap');}else if(!/Click/.test(r[0])&&!/Click/.test(r[1])&&!/Scroll/.test(r[1]))throw new Error('desktop still says tap/swipe: '+r.join(' | '));};
