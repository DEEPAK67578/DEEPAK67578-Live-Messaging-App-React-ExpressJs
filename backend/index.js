const express = require("express")
const router = require("./routes/route")
const app = express()
const multer = require("multer")
const path = require("path")
const mongoose = require('mongoose')
app.use(express.json())


const storage = multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null,"userProfiles")
    },
    filename:(req,file,cb)=> {
        cb(null,Date.now() + "-" + file.originalname)
    }
})

const multerStore = multer({storage:storage})



app.use((req,res,next)=> {
     res.setHeader("Access-Control-Allow-Origin","*")
     res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH","DELETE")
     res.setHeader("Access-Control-Allow-Header","Content-Type Authorization")
     next()
})

app.use(multerStore.single("file"),router)

mongoose.connect("mongodb://localhost:27017/messagingApp").then(()=> {
    app.listen(3000)
})

