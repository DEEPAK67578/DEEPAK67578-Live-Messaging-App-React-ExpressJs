const { signUpModel } = require("../model/signup.model")

const bcrypt = require("bcrypt")

module.exports.signUpUser = async (req,res) => {
    const {name,email,password,confirmPassword,description} = req.body
    console.log(req.body,req.file)
    if(!name || name.length == 0 || !email || email.length == 0 || !password || password.length == 0 || password.length < 8 || !confirmPassword || confirmPassword.length < 8 || !description ) {
        return res.json("Field is Missing").status(401)
    }
    const passHash = await bcrypt.hash(password,12)
    if(password != confirmPassword) {
        return res.json("Password Does Not Matching").status(401)
    }
    const existing = await signUpModel.find().where({email:email})

    if(existing.length != 0) {
       return res.json("Email Already Exists").status(403)
    }

    const signUpObj = new signUpModel({
        name,
        email,
        password:passHash,
        description,
        imgPath:req.file.path
    })

    signUpObj.save().then(()=> {
        res.json("Signup SuccessFull").status(201)
    })
}