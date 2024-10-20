const {Schema,model} = require("mongoose")

const individualRequestsSchema = new Schema({
    from:String,
    to:String,
    requestState:{
        type:String,
        default:"Pending"
    }
})

module.exports = model("IndividualRequestsModal",individualRequestsSchema)