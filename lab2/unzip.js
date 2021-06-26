const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const unzip = zlib.createGunzip();

const readable = fs.createReadStream(path.join(__dirname, 'ziptext.txt.gz'))
const writable = fs.createWriteStream(path.join(__dirname, 'unziptext.txt'))
readable.pipe(writable)