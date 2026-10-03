// Planet faces are never cut by their own ball: a face is flat to the screen, so off to the side of the view it now sits further out and both eyes show.
// Wide desktop window (where planets sit far off the middle). Every view is checked twice: with the old placement (must catch a cut eye, proving the check works) and with the fix (must find none).
module.exports=async({pg,S,W})=>{await pg.setViewportSize({width:1275,height:640});await W(1500);await pg.click('#go');await W(5000);
const scan=async n=>{const bad=new Set();for(let i=0;i<n;i++){await W(600);(await pg.evaluate(()=>window.__faceClip())).forEach(x=>bad.add(x));}return [...bad];};
const tour=async old=>{await pg.evaluate(o=>{window.__faceNoFix=o},old);const all=[];for(const id of ['sun','mercury','venus','earth','mars','jupiter','saturn','uranus','neptune']){await pg.evaluate(i=>document.querySelector(`#strip .th[data-id="${i}"]`).click(),id);await W(6000);if(!old&&id==='earth')await S('fc_earth');all.push(...(await scan(4)).map(x=>id+' view: '+x));}return all;};
const before=await tour(true);console.log('old placement',before.length,JSON.stringify(before.slice(0,8)));
const after=await tour(false);console.log('fixed',after.length,JSON.stringify(after));
if(!before.length)throw new Error('the check found nothing with the old placement, so it proves nothing');if(after.length)throw new Error('a face is cut by its ball: '+after.slice(0,5).join(', '));};
