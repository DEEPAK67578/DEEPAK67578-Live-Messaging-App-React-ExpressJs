const jwt = require("jsonwebtoken");

module.exports.verifyToken = async (req, res,next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json("Not Authenticated");
  }
  const token = req.get("Authorization").split(" ")[1];
  console.log(token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  } catch (err) {
    return res.status(401).json("Not Authenticated");
  }

  console.log(decodedToken)

  if (!decodedToken) {
    return res.status(401).json("Not Authenticated");
  }
  console.log(decodedToken)
  req.userId = decodedToken.id;
  next();
};
