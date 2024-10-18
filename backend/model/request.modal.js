const {model,Schema,SchemaTypes} = require("mongoose")

const requests = new Schema({
    userId:{
        type:SchemaTypes.ObjectId,
        required:true
    },
    requests:{
        type:Array,
        required:true
    }
})

module.exports = model("request",requests)