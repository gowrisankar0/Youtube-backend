const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const createError = require("../error");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const pwd = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: pwd,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

//signIn

const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "user not found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "wrong credentials"));

    const { password, ...otherDetails } = user._doc;

    const token = jwt.sign({ id: user._id }, "secretkey");

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherDetails);
  } catch (error) {
    next(error);
  }
};


//oAuth



const googleAuth = async(req,res,next)=>{


  try {

      const user =await User.findOne({email:req.body.email});
      if(user) {
        
    const token = jwt.sign({ id: user._id }, "secretkey");

    res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json(user._doc);
      }else{

     const newUser =new User({
      ...req.body,
      fromGoogle:true
     }) 

     const savedUser =await newUser.save();

     const token = jwt.sign({ id: savedUser._id }, "secretkey");

     res
     .cookie("access_token", token, {
       httpOnly: true,
     })
     .status(200)
     .json(savedUser._doc);

      }
    
  } catch (error) {
    next(error)
    
  }
}


module.exports = { signup, signin,googleAuth };
