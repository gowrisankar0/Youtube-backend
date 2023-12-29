const jwt =require("jsonwebtoken");
const createError = require("./error");

const verifyToken = (req,res,next)=>{

    const token =req.cookies.access_token;

    if(!token) return next(createError(401,"you are not authenticated"))
       jwt.verify(token,"secretkey",(err,user)=>{
           if(err) return next(createError(403,"token not valid"));

           req.user=user;
           next();
    })
};



module.exports=verifyToken;