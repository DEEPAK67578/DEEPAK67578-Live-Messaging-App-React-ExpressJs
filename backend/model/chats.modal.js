const {Schema,model} = require("mongoose")

const chatSchema = new Schema({
    member:Array,
},{timestamps:true})

module.exports = model("Chat",chatSchema)