const { signUpUser,getAllUsers,loginUser,verifyUser, getIndividualUser } = require("../controller/users.controller")
const multer = require("multer")
const protector = require("../routeProtector/protector")
const { getRequest,getRequestForUser,accrejreq } = require("../controller/requests.controller")
const router = require("express").Router()
const {verifyToken} = require("../middleware/verifyToken")
const storage = multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null,"userProfiles")
    },
    filename:(req,file,cb)=> {
        cb(null,Date.now() + "-" + file.originalname)
    }
})

const multerStore = multer({storage:storage})

router.get("/getAllUsers",getAllUsers)
router.post("/signup",multerStore.single("file"),protector,signUpUser)
router.post("/login",loginUser)
router.get("/verifyToken",verifyUser)

router.get("/getUser/:id",getIndividualUser)

//requests
router.post("/requests",verifyToken,getRequest)
router.get("/getAllReq",verifyToken,getRequestForUser)
router.post("/accrejreq",verifyToken,accrejreq)


module.exports = router