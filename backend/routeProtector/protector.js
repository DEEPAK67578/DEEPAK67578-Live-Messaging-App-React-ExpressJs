const {signUpModel} = require("../model/signup.model")

module.exports = async (req,res,next)=> {
    const {name,email,password,confirmPassword,description} = req.body
    if(!name || name.length == 0 || !email || email.length == 0 || !password || password.length < 8 || !confirmPassword || confirmPassword.length < 8 || !description ||!req.file ) {
        return res.status(401).json("Field is Missing")
    }

    if(password != confirmPassword) {
        return res.status(401).json("Password Does Not Matching")
    }

    const existing = await signUpModel.find({}).where({email:email})

    if(existing.length != 0) {
       return res.status(403).json("Email Already Exists")
    }

    next()
}