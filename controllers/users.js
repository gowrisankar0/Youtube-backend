const mongoose =require("mongoose");
const User =require("../models/User");
const createError = require("../error");
const Video = require("../models/Video");




//update
const update =async(req,res,next)=>{

   
        if(req.params.id===req.user.id){

            try {
                const updatedUser =await User.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                });
                res.status(200).json(updatedUser)
            } catch (error) {
                next(error)
            }

        }else{
            return next(createError(403,"you can update only your account"))
        }
    };
   

    //delete
const deleteUser =async(req,res,next)=>{

   
        if(req.params.id===req.user.id){

            try {
                const deleteUser =await User.findByIdAndDelete(req.params.id)
                res.status(200).json("user has been deleted");
            } catch (error) {
                next(error)
            }

        }else{
            return next(createError(403,"you can delete only your account"))
        }
    };
   
        
 //get user 
 
 
 const getUser =async(req,res,next)=>{

    try {
        const user =await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }

 }

  //subscribe user

  const subscribe =async (req,res,next)=>{

    try {
       await User.findByIdAndUpdate(req.user.id,{
               $push:{subscribedUsers:req.params.id}
       });

       await User.findByIdAndUpdate(req.params.id,{
        $inc:{subscribers:1},
       });
      res.status(200).json("subscription succesfull")
    } catch (error) {
            next(error) 
    }

  }


  //unsubceripbe 

  const unsubscribe =async (req,res,next)=>{

    try {
       await User.findByIdAndUpdate(req.user.id,{
               $pull:{subscribedUsers:req.params.id}
       });

       await User.findByIdAndUpdate(req.params.id,{
        $inc:{subscribers: -1}
       });
      res.status(200).json("unsubscription succesfull")
    } catch (error) {
            next(error) 
    }

  }


 const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes:id},
        $pull:{dislikes:id}
      })
      res.status(200).json("The video has been liked.")
    } catch (err) {
      next(err);
    }
  };


  const dislike =async (req,res,next)=>{

    const id = req.user.id;
       const videoId = req.params.videoId;

    try {

        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })
       res.status(200).json("The video has been disliked")
    } catch (error) {
            next(error) 
    }

  }




module.exports={update,deleteUser,getUser,subscribe,unsubscribe,like,dislike}