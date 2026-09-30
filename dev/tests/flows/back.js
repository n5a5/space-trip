module.exports=async({pg,S,W,visit})=>{const m=()=>pg.evaluate(()=>document.querySelector('#pill').textContent+' | back '+(!document.querySelector('#backbtn').hidden));
await pg.click('#go');await W(3000);console.log('start',await m());
await pg.click('.th[data-id="mars"]');await W(4000);console.log('mars',await m());await pg.click('#backbtn');await W(3000);console.log('btn->',await m());
await pg.click('#actions >> text=Fly home');await W(20000);await S('bk_home');console.log('home',await m());
await pg.goBack();await W(6000);console.log('phoneBack->',await m());
await pg.click('.th[data-id="earth"]');await W(2500);if(await pg.isVisible('.th[data-id="earth"]'))await pg.click('.th[data-id="earth"]');   // tap Earth; tap again unless Explorer Earth already opened
await W(9000);console.log('explorer',await m());
await pg.click('#tstrip .th[data-lm="eiffel"]');await W(5000);await pg.click('#actions >> text=Visit');await W(14000);console.log('site',await m());
await pg.goBack();await W(8000);console.log('phoneBack->',await m());
await pg.goBack();await W(3000);console.log('phoneBack->',await m());
await pg.goBack();await W(6000);console.log('phoneBack->',await m());
await S('bk_end');};
