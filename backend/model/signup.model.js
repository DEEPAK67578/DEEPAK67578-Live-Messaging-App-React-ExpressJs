const {Schema,model} = require("mongoose")

const SignupSchema = new Schema({
    name:String,
    email:String,
    password:String,
    imgPath:String,
    description:String,
})

exports.signUpModel = model("signup",SignupSchema)