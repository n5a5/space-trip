// Rapid lines (like flying past a landmark while a reminder starts) must never fall back to the robot voice for an interrupted line.
module.exports=async({pg,W})=>{await pg.click('#go');await W(2500);
await pg.evaluate(()=>{window.__tts=[];const ss=window.speechSynthesis;ss.speak=u=>{window.__tts.push(u.text);};});
const keys=await pg.evaluate(()=>window.__sayKeys().filter(k=>/^(flyNear|driveNear|missionDone|rainbow|cloudThrough|flyLand|dailyIn|tapStop)$/.test(k)));
for(let r=0;r<3;r++)for(const k of keys){await pg.evaluate(k=>window.__speak(k),k);await W(40);}
await W(4000);const t=await pg.evaluate(()=>window.__tts);console.log('keys',keys.length,'robot-voice fallbacks',t.length,JSON.stringify(t.slice(0,3)));
if(t.length)throw new Error('interrupted lines fell back to the phone voice (two voices at once): '+t.length);};
