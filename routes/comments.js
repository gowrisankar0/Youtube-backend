const express =require("express");
const verifyToken = require("../verifyToken");
const router =express.Router();
const {addComment,deleteComment,getComments}=require("../controllers/comments")


router.post("/",verifyToken,addComment)
router.delete("/:id",verifyToken,deleteComment)
router.get("/:videoId",getComments)


module.exports=router;
