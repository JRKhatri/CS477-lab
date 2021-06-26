/**
 * Create a simple Node script that converts 'www.miu.edu' domain name to the equivalent IP address. 
 * (Search and learn 'dns' module, resolve4)
 */
//first method
const dns = require('dns');
dns.resolve4('www.miu.edu', {ttl:true}, (err, address)=>{
    console.log(address)
    console.log("-----")
    
})

// second  method 
dns.resolve4('www.miur.edu', (error, address)=>{
    
    if(error){
        console.log("error: worng DNS")
    }else {
        console.log(address)
    }
})

// third method
dns.resolve4('www.miu.edu', (error, address)=>{
    console.log(address)
    console.log('********')
})