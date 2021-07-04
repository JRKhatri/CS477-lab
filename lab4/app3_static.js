const express = require('express');
const app = express();
const path = require('path')
const productRouter = require('./routes/product_static')
const userRouter = require('./routes/user_static')

app.set('query parser', 'extended');
app.use(express.urlencoded({
    extended: true}))
app.get('/',(req, res, next)=>{
    throw new Error();

})

app.use('/abc', express.static(path.join(__dirname, 'views')))

app.use('/user', userRouter);
app.use('/product', productRouter)

app.use((err, req, res, next)=>{
    res.send('Error: could not find the link')

})

app.listen(5000, ()=> console.log("Running 5000"))