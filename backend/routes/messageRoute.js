const express = require("express")
const messageRouter = express.Router()
const {addMessage, getmessages} = require("../controller/message.controller")
messageRouter.post("/",addMessage)

messageRouter.get("/:chatId",getmessages)

module.exports = messageRouter