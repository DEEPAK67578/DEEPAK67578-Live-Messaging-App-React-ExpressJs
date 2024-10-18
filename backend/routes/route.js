const { signUpUser } = require("../controller/users.controller")

const router = require("express").Router()

router.get("/signup",signUpUser)

module.exports = router