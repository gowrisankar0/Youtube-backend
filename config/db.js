const mongoose =require("mongoose");
require("dotenv").config();

const url ="mongodb+srv://gowrisankar:gowri@gowrisankar.5gykdnp.mongodb.net/youtube?retryWrites=true&w=majority";


const ConnectDb= async()=>{
    try {
        const con =await mongoose.connect(url);
        console.log(`db is connected ${con.connection.host}`);
    } catch (error) {
        console.log(error);
    }

}


module.exports=ConnectDb