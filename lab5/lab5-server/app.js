const express = require('express')
const app = express();
const cors = require('cors')
const bookRouter = require('./routes/bookRouter')

app.use(cors())
app.use(express.json())
app.use(bookRouter);

app.use((req, res, next) =>{
    res.status(404).json({error: err.message})
})

app.use((err, req, res, next) => {
    if(err.message === "ITEM NOT FOUND"){
        res.status(404).json({error: err.message})
    } else {
        res.status(500).json({error: "Try again"})
    }
})



app.listen(5000, ()=>console.log("Running server 5000"))

