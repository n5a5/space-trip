// Splits voice.json ({ text: data-URI }) into voice/<hash>.ogg files plus voice/index.json (the list of hashes), in the given folder.
const fs = require('fs'), path = require('path');
const fnv = s => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); };
module.exports = (outDir, src = 'voice.json') => {
  const v = JSON.parse(fs.readFileSync(src, 'utf8')), dir = path.join(outDir, 'voice'), seen = {};
  fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  for (const [text, uri] of Object.entries(v)) {
    const h = fnv(text); if (seen[h] && seen[h] !== text) throw new Error('voice hash collision: ' + text);
    seen[h] = text; fs.writeFileSync(path.join(dir, h + '.ogg'), Buffer.from(uri.slice(uri.indexOf(',') + 1), 'base64'));
  }
  fs.writeFileSync(path.join(dir, 'index.json'), JSON.stringify(Object.keys(seen)));
  return Object.keys(seen).length;
};
module.exports.fnv = fnv;
if (require.main === module) console.log(module.exports(process.argv[2] || 'beta'), 'voice files');
