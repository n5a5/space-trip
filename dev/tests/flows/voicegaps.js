// Every line the app can say has a recorded clip (no robot-voice fallback on a phone without voices).
module.exports=async({pg,S,W})=>{await W(1500);const gaps=await pg.evaluate(()=>window.__voiceGaps());console.log('lines without a recording',gaps.length,gaps.slice(0,5).join(' | '));if(gaps.length)throw new Error(gaps.length+' lines have no recording');};
