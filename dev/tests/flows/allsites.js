// Visit every landmark scene and screenshot it (to judge whether each background looks like its city).
module.exports=async({pg,S,W,visit})=>{const T=process.env.TAG||'';await pg.click('#go');await W(1500);await pg.click('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await pg.click('.th[data-id="earth"]');await W(11000);
await pg.click('#actions >> text=Places');await W(16000);await S('as_ksc'+T);
for(const id of (process.env.SITES||'liberty,canyon,amazon,eiffel,bigben,colosseum,pyramids,taj,wall,everest,opera,penguins').split(',')){await visit(id);await W(20000);await S('as_'+id+T);}};
