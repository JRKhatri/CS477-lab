const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/form', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'product.html'))
})

router.post('/form' , (req, res, next)=>{
    console.log(req.body);
    res.send("Product form submitted Successfully")
})

module.exports=router;