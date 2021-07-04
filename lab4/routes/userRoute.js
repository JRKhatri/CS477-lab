const express = require("express");
const options = {
    "caseSensitive": false,
    "strict":false
}
const router = express.Router(options);

router.get('/form', (req, res, nxt)=>{
    const html =`
    <h2>User form</h2>
<form action="form" method="post">
<div>
 First Name: <input type="text" name="fname"> </br></br>
 Last Name: <input type="text" name="lname"> </br></br>
 Address: <textarea name="address"></textarea></br></br>
 <input type="submit" value="Submit">
</form> 
</div>
<p>Click the "Submit" button.</p>
</body>
</html>
`
res.send(html)

})

router.post('/form', (req, res, next)=>{
    console.log(req.body)
    res.send("Done.........")

})
module.exports=  router;