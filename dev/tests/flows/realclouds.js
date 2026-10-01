// Real Earth: the cloud layer must turn with the ground when Earth spins (it used to stay behind, leaving ghost continents on the night side).
module.exports=async({pg,S,W})=>{await pg.click('#go');await W(2000);await pg.click('.th[data-id="earth"]');await W(3000);await pg.click('#style');await W(6000);
const box=await pg.locator('canvas').first().boundingBox();const cx=box.x+box.width/2,cy=box.y+box.height*.4;await pg.mouse.move(cx-120,cy);await pg.mouse.down();await pg.mouse.move(cx+120,cy,{steps:12});await pg.mouse.up();await W(3000);await S('realclouds');
const ok=await pg.evaluate(()=>window.__cloudSync());console.log('clouds on earth',ok);if(!ok)throw new Error('clouds not attached to the Earth');};
