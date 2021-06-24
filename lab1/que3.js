/**
 * // Fix the slow function to be asynchronous/non-blocking
  function slow(callback){ 
	for(let i=0; i<= 5e8; i++){}
	if (Math.random() > 0.5) { 	
		return callback("Error",null) 
	} 
	callback(null, {id:12345}) 
} 

function exec(fn){ 
	// Complete the code here to implement chaining with callback
    new Promise(function(resolve,reject{
        fn(callback)

    })
}

exec(slow).done(function(data){ console.log(data); })
	.fail(function(err){ console.log("Error: " + err); }); 
 */