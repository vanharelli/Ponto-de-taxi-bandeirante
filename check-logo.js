const fs = require('fs');
const path = 'public/logotaxi.png';
const buf = fs.readFileSync(path);
console.log('Size:', buf.length, 'bytes');
const id = buf.slice(0, 8).toString('hex');
console.log('PNG:', id.slice(0, 8) === '89504e47');
const w = buf.readUInt32BE(16);
const h = buf.readUInt32BE(20);
console.log('Dimensions:', w, 'x', h);