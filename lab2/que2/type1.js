/**
 * Create a web server that's going to send a response of big image (bigger then 3MB) to any client 
 * that sends a request to your specified server:port. Use the best way for performance. 
 * (Try to solve this in many different ways and inspect the loading time in the browser and send many requests to 
 * see the performance differences)
 */
 const fs = require('fs')
 const path = require('path')
 const http = require('http');
 const server = http.createServer();


 server.on('request', function(req, res){
     res.writeHead(200,{'Content-Type':'image/jpeg'})
     const src =fs.createReadStream(path.join(__dirname, 'card.jpg'))
     src.pipe(res)

 })
 server.listen(3050, ()=>console.log('server running'))