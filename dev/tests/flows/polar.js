// The polar bear never shows as two pictures: where a phone can't join bear + snowflake, a whitened bear is used instead.
module.exports=async({pg,S,W})=>{await pg.click('#go');await W(2000);
const r=await pg.evaluate(()=>{const e=document.createElement('span'),o={};o.ok=window.__animalEm('polarBear',e);o.okCls=e.className;window.__noZwj=true;o.old=window.__animalEm('polarBear',e);o.oldCls=e.className;o.panda=window.__animalEm('panda',e);o.pandaCls=e.className;window.__noZwj=false;return o});
console.log(JSON.stringify(r));const seg=t=>[...new Intl.Segmenter('en',{granularity:'grapheme'}).segment(t)].length;
if(r.old!=='🐻'||!/pbw/.test(r.oldCls))throw new Error('no fallback bear');if(/pbw/.test(r.pandaCls)||r.panda!=='🐼')throw new Error('fallback leaked to panda');if(/pbw/.test(r.okCls))throw new Error('whitened a bear that was fine');if(seg(r.ok)!==1)throw new Error('polar bear is not one picture');};
