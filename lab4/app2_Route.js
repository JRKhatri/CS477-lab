const express = require("express");
const app = express();
const path = require('path');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoute')


app.set('query parser', 'extended');
app.use(express.urlencoded({
    extended: true}))

app.use('/product', productRouter);
app.use('/user', userRouter)

app.listen(4000, ()=>{
    console.log("running 4000")
} )

