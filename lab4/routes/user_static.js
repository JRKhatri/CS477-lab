const express = require('express');
const path = require ('path')
const router = express.Router();

router.get('/form',(req, res, next)=>{
    res.sendFile(path.join(__dirname,'..','views','user.html'))
})

router.post('/form' , (req, res, next)=>{
    console.log(req.body);
    res.send("User form submitted Successfully")
})

module.exports = router;