const express =require("express");
const router =express.Router();
// const {test, unsubscribe} =require("../controllers/users");
const {update,deleteUser,getUser,subscribe,unsubscribe,like,dislike} =require("../controllers/users");
const verifyToken =require("../verifyToken")
 

//update

router.put("/:id",verifyToken ,update);

//delete

router.delete("/:id",verifyToken,deleteUser);

//get specific

router.get("/find/:id",getUser)

//subscribe

router.put("/sub/:id",verifyToken,subscribe);

//unsub

router.put("/unsub/:id",unsubscribe);

router.put("/like/:videoId",verifyToken,like)

router.put("/dislike/:videoId",verifyToken,dislike)

module.exports=router;