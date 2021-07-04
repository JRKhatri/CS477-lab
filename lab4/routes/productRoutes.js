const express = require("express");
const options = {
    "caseSensitive": false,
    "strict":false
}
const router = express.Router(options);

router.get('/form', (req, res, nxt)=>{
    const html =`
    <h2>Products form</h2>
<form action="form" method="post">
<div>
 Product title: <input type="text" name="title"> </br></br>
 Product name: <input type="text" name="productname"> </br></br>
 Description: <textarea name="description"></textarea></br></br>
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