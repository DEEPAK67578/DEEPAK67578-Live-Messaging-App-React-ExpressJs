const express = require("express")
const router = require("./routes/route")
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
app.use((req,res,next)=> {
     res.setHeader("Access-Control-Allow-Origin","*")
     res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH","DELETE")
     res.setHeader("Access-Control-Allow-Header","Content-Type Authorization")
     next()
})

app.use(router)

mongoose.connect("mongodb://localhost:27017/messagingApp").then(()=> {
    app.listen(3000)
})

