const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

//setting up connection with mongoDB
mongoose.connect(`${process.env.MONGODB_URI}`,{
}).catch((error)=>{
    console.log(error);
}).then(
    console.log("Connected to db")
);