module.exports=async({pg,S,W})=>{const st=()=>pg.evaluate(()=>window.__toyState());
await pg.click('#go');await W(3000);await pg.click('.th[data-id="earth"]');await W(2500);await pg.click('.th[data-id="earth"]');   // tap Earth, then tap it again to open Explorer Earth
await W(11000);await S('s_far');
await pg.click('#tstrip >> text=N. America');await W(7000);await S('s_na');
await pg.click('#tzin');await W(5000);let p=await pg.evaluate(()=>window.__toyScr('pt',window.__stateC('Texas')));console.log('FL',p);await pg.mouse.click(p[0],p[1]);await W(4000);await S('s_fl');console.log(JSON.stringify(await st()));
await pg.click('#actions >> text=Games');await W(600);await pg.click('#actions >> text=States');await W(9000);await S('s_quiz');const pill=(await st()).pill;console.log('quiz',pill);
const target=pill.replace('Find ','');const wrong=target==='Texas'?'Montana':'Texas';
p=await pg.evaluate(n=>window.__toyScr('pt',window.__stateC(n)),wrong);await pg.mouse.click(p[0],p[1]);await W(3000);await S('s_wrong');console.log('wrong',JSON.stringify(await st()));
let q;for(let k=0;k<20;k++){await W(700);q=p;p=await pg.evaluate(n=>window.__toyScr('pt',window.__stateC(n)),target);if(q&&Math.hypot(p[0]-q[0],p[1]-q[1])<2)break;}   // wait for the camera to settleconsole.log('target at',p);await pg.mouse.click(p[0],p[1]);await W(3000);await S('s_right');const found=await pg.evaluate(()=>document.querySelector('#tstars').textContent);if(!/1 found/.test(found))throw new Error('tapping '+target+' was not accepted: '+(await st()).pill+' / '+found);console.log('right',JSON.stringify(await st()), await pg.evaluate(()=>document.querySelector('#tstars').textContent));
await W(8000);console.log('next',JSON.stringify(await st()));await pg.click('#actions >> text=Done');await W(3000);
await pg.click('#tzin');await W(4000);await pg.click('#tzin');await W(5000);await S('s_close');};
