// Základní kontrola syntaxe a hlavních funkcí Hesloměru bez externích závislostí.
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const inline=[...html.matchAll(/<script(?:\\s[^>]*)?>([\\s\\S]*?)<\\/script>/g)].map(x=>x[1]).filter(Boolean);
assert.equal(inline.length,1,'Expected one inline app script');
new vm.Script(inline[0],{filename:'index.html inline JS'});
const ids=['password','time','strength','feedback','explanation','reasons','advice','pinInput','combinations','pinFeedback','kind','size','sizeLabel','generate','output','generatorNote','copy','presentation','scenarioLabel','randomPinExample','randomExample'];
for(const id of ids)assert(html.includes('id="'+id+'"'),'Missing element: '+id);
assert(html.includes('data-pin-example="0000"'));
assert(html.includes('data-example="P@ssw0rd!"'));
assert(html.includes('window.heslomerCzechWords'));
assert(fs.existsSync('data/czech-words.js'));
new vm.Script(fs.readFileSync('data/czech-words.js','utf8'),{filename:'czech-words.js'});
console.log('Hesloměr: syntax and structural smoke checks passed');
