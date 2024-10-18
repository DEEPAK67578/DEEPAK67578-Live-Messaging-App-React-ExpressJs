const { signUpModel } = require("../model/signup.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.signUpUser = async (req, res) => {
  const { name, email, password, confirmPassword, description } = req.body;
  const passHash = await bcrypt.hash(password.toString(), 12);
  const signUpObj = new signUpModel({
    name,
    email,
    password: passHash,
    description,
    imgPath: req.file.path,
  });

  signUpObj.save().then(() => {
    res.json("Signup SuccessFull").status(201);
  });
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const foundOne = await signUpModel.findOne({ email: email });

  if (!foundOne) {
    return res.status(403).json("User not Found");
  }

  console.log(typeof foundOne.password, typeof password);

  const bool = bcrypt.compareSync(password, foundOne.password);

  if (!bool) {
    return res.status(403).json("Credential Error");
  }

  const token = jwt.sign({ id: foundOne.id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "10h",
  });

  res.status(200).json({ token: token, userId: foundOne.id });
};

module.exports.getAllUsers = async (req, res,next) => {
  const users = await signUpModel.find({}, { password: 0, email: 0 });

  const authHeader = req.get("Authorization")
  if(!authHeader) {
   return res.json(users).status(200);
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
    decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

  if(!decodedToken) {
    return res.json(users).status(200);
  }

  const filteredUsers = users.filter((val)=> {
    return val.id != decodedToken.id
  })
  
  return res.json(filteredUsers).status(200);
};

module.exports.verifyUser = async (req, res,next) => {
  const authHeader = req.get("Authorization")
  if(!authHeader) {
    return res.json("Not Authorized").status(401)
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  } catch (err) {
    return res.json("Not Authorized").status(401)
  }

  if(!decodedToken) {
    return res.json("Not Authorized").status(401)
  }

  res.json({id:decodedToken.id,token:token})
};
