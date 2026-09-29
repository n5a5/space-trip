module.exports=async({pg,S,W})=>{await pg.click('#go');await W(1500);await pg.click('.th[data-id="mars"]');await W(4000);await S('m_focus');
await pg.click('text=Drive on Mars');await W(12000);await S('m_start');
const go=await pg.$('#dgo');const bb=await go.boundingBox();await pg.mouse.move(bb.x+50,bb.y+50);await pg.mouse.down();await W(6000);await S('m_drive');
const dr=await pg.$('#dr');const b2=await dr.boundingBox();await pg.mouse.up();
await pg.evaluate(()=>{});await W(500);
// steer+go via direct state for testing
await pg.mouse.move(b2.x+30,b2.y+30);await pg.mouse.down();await W(3000);await pg.mouse.up();await S('m_turn');
await pg.click('#actions >> text=Back to space');await W(4000);await S('m_back');};
