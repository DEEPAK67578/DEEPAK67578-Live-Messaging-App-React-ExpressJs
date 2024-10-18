const { signUpUser } = require("../controller/users.controller")

const router = require("express").Router()

router.post("/signup",signUpUser)

module.exports = router