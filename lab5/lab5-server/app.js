const express = require('express')
const app = express();
const bookRouter = require('./routes/bookRouter')

app.use(express.json())
app.use(bookRouter);





app.listen(5000, ()=>console.log("Running server 5000"))

