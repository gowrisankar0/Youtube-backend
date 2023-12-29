const express =require("express");
const {signup,signin,googleAuth} =require("../controllers/auth")

const router =express.Router();

//CREATE

router.post("/signup",signup);
router.post("/signin",signin);


router.post("/google",googleAuth)


module.exports=router;