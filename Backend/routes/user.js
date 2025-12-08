const express=require("express")
const router=express.Router()


const authenticatemiddleware=require("../middleware/auth")

const Controllers=require("../controllers/user")

router.post("/signup",Controllers.signup)
router.post("/login",Controllers.login)
router.post("/update", authenticatemiddleware.authenticate, Controllers.updateProfile)



module.exports=router