const { signUpModel } = require("../model/signup.model")
const bcrypt = require("bcrypt")

module.exports.signUpUser = async (req,res) => {
    const {name,email,password,confirmPassword,description} = req.body
    const passHash = await bcrypt.hash(password,12)
    if(password != confirmPassword) {
        res.json("Password Does Not Matching").status(500)
    }
    const existing = await signUpModel.find().where({email:email})

    if(existing.length != 0) {
       return res.json("Email Already Exists").status(500)
    }

    const signUpObj = new signUpModel({
        name,
        email,
        password:passHash,
        description
    })
    
    signUpObj.save().then(()=> {
        res.json("Signup SuccessFull").status(300)
    })
}