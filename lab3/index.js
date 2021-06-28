const http = require('http');
const fs = require('fs');

http.createServer(function(req, res){
    if(req.url ==="/"){
        fs.createReadStream("./index.html").pipe(res);
    } else if(req.url ==="/signup" && req.method ==='POST'){
    let reqData = [];
    req.on('data', (chunk)=>{
        reqData.push(chunk)
    });

    req.on('end', function(){
        const initialMessage = Buffer.concat(reqData).toString();
        console.log(initialMessage);
        const intitalMessageArray = initialMessage.split("=");
            const msg = intitalMessageArray[1].split("+");
            console.log(msg)
            let message="";
            for(let item of msg){
                 message += item + " ";
            }   
            console.log(message)

            fs.writeFile('message.txt', message , (error)=>{
             if(error){
                res.writeHead(404);
                return res.end('Unsuccessful: message could not be saved');
             } 
             fs.createReadStream("./index.html").pipe(res);
            
            });
            
        })
        
        
            
            

    }else {
        res.writeHead(404);
         res.end("Unsuccessful");
    }

}).listen(3000)