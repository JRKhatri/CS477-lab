const http = require('http');
const fs = require('fs');
const path = require('path')

http.createServer((req, res)=>{
console.log(path.join('/', 'users','name', 'notes.txt'));
 res.writeHead(200,{'Content-Type':'image/jpeg'});
 fs.createReadStream(path.join(__dirname, 'card.jpg')).pipe(res)
}).listen(3090, ()=> console.log('type2 running'))


   