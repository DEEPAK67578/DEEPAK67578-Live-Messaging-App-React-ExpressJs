const {model,Schema,SchemaTypes} = require("mongoose")

const requests = new Schema({
    userId:{
        type:String,
        required:true
    },
    requests:[{
       id:{
        type:String
       },
       request: {
        type:String,
        default:"Pending"
       }
    }]
})

module.exports = model("request",requests)