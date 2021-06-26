/**
 * Using Node Stream API, create a script to unzip a file (after you zip it). (Use zlib.createGunzip() stream)
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const gzip = zlib.createGzip();

const readable = fs.createReadStream(path.join(__dirname, 'textFile.txt'))
const writable = fs.createWriteStream(path.join(__dirname, 'ziptext.txt.gz'))
readable.pipe(gzip).pipe(writable);
