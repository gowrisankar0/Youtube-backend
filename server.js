const express =require("express");
const app =express();
const ConnectDb =require("./config/db")
const userRouter =require("./routes/users");
const authRouter =require("./routes/auth");
const cookieParser =require("cookie-parser");
const videoRouter =require("./routes/video");
const commentRouter = require("./routes/comments");
const cors =require("cors")

ConnectDb();
app.use(cookieParser())
app.use(express.json());
app.use(cors())



app.use("/api/user",userRouter)
app.use("/api/auth",authRouter);
app.use("/api/videos",videoRouter);
app.use("/api/comments",commentRouter);


app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "some thing went wrong";
   return res.status(status).json({
    success:false,
    status:status,
    message,
   });
})

app.listen(4000,()=>{
    console.log("server is up and running");
})