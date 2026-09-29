// beta build: same as build3 but title "Amelia's Space Trip Beta", output beta/index.html
const fs=require('fs');const src=process.argv[2]||'space6.src.html', OUT=process.argv[3]||'beta';
let s=fs.readFileSync(src,'utf8').replace('__LAND__',fs.readFileSync('land.json','utf8')).replace('__US__',fs.readFileSync('usstates.json','utf8'));
s=s.replace('__VERSION__','test');
s=s.replace('__VOICE__',fs.existsSync('voice.json')?fs.readFileSync('voice.json','utf8'):'{}');
s=s.replace("<title>Amelia's Space Trip</title>","<title>Amelia's Space Trip Beta</title>");
if(OUT==='beta')fs.writeFileSync('beta/amelias-space-trip-beta.html',s);
fs.writeFileSync(OUT+'/test.html','<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><link rel="icon" href="data:,"><meta http-equiv="Content-Security-Policy" content="default-src \'self\' \'unsafe-inline\' \'unsafe-eval\' https://cdn.jsdelivr.net; img-src \'self\' data: blob:; media-src \'self\' data: blob:; connect-src \'self\'; style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; worker-src blob:"><style>[hidden]{display:none!important}body{margin:0}</style></head><body>'+s+'</body></html>');
console.log(src, s.length);

require('./voicesplit.js')(OUT);
