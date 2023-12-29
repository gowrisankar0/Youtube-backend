const express =require("express");

const router =express.Router();
const verifyToken =require("../verifyToken")
const {addvideo,updateVideo,deleteVideo,getVideo,addView,random,trend,sub,getByTag,getBySearch}= require("../controllers/video")
//create video

router.post("/",verifyToken,addvideo)
router.put("/:id",verifyToken,updateVideo)
router.delete("/:id",verifyToken,deleteVideo)
router.get("/find/:id",getVideo);
router.put("/view/:id",addView);
router.get("/trend",trend);
router.get("/random",random);
router.get("/sub",verifyToken,sub);
router.get("/tags",getByTag);
router.get("/search",getBySearch);




module.exports=router;