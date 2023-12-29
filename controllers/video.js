const mongoose =require("mongoose");
const Video =require("../models/Video");
const createError = require("../error");
const User =require("../models/Comment")



const addvideo =async(req,res,next)=>{
    try {
        const newVideo =new Video({userId:req.user.id,...req.body});
        const savedVideo =await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (error) {
        next(error)
    }

};

//update
const updateVideo =async(req,res,next)=>{
    try {
        const video =await Video.findById(req.params.id);
        if(!video) return next(createError(404,"video not found"));
if(req.user.id===video.userId){
    const updatingVideo =await Video.findByIdAndUpdate(req.params.id,{
        $set:req.body,
    },{new:true});

    res.status(200).json(updatingVideo);
}else {
    return next(createError(403, "You can update only your video!"));
  }
 
    } catch (error) {
        next(error)
    }

};


//delete video
const deleteVideo =async(req,res,next)=>{
    try {
        const video =await Video.findById(req.params.id);
        if(!video) return next(createError(404,"video not found"));
if(req.user.id===video.userId){
    const updatingVideo =await Video.findByIdAndDelete(req.params.id);

    res.status(200).json("The video deleted succesfully");
}else {
    return next(createError(403, "You can delte only your video!"));
  }
 
    } catch (error) {
        next(error)
    }

};

//getvideo

const getVideo =async(req,res,next)=>{

    try {

        const video =await Video.findById(req.params.id);
        res.status(200).json(video) 
        
    } catch (error) {
        next(error)
    }

}

//views
const addView =async(req,res,next)=>{

    try {

        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        });
        res.status(200).json("The view has been increased") 
        
    } catch (error) {
        next(error)
    }

}

//random

const random =async(req,res,next)=>{

    try {

       const videos =await Video.aggregate([{$sample:{size:40}}]);
       res.status(200).json(videos)

        
    } catch (error) {
        next(error)
    }

}
//trends
const trend =async(req,res,next)=>{

    try {

       const videos =await Video.find().sort({views:-1  });
       res.status(200).json(videos)

        
    } catch (error) {
        next(error)
    }

}

//sub

 const sub = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const subscribedChannels = user.subscribedUsers;
  
      const list = await Promise.all(
        subscribedChannels.map(async (channelId) => {
          return await Video.find({ userId: channelId });
        })
      );
  
      res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
      next(err);
    }
  };




const getByTag =async(req,res,next)=>{

    const tags =req.query.tags.split(",");
 

    try {

       const videos =await Video.find({tags:{$in:tags}}).limit(20);
       res.status(200).json(videos)

        
    } catch (error) {
        next(error)
    }

}



const getBySearch =async(req,res,next)=>{

    const query =req.query.q;

    try {

       const videos =await Video.find({title:{$regex : query , $options :"i"}}).limit(40);
       res.status(200).json(videos)

        
    } catch (error) {
        next(error)
    }

}



module.exports={addvideo,updateVideo,deleteVideo,getVideo,addView,random,trend,sub,getByTag,getBySearch}