const mongoose = require("mongoose");

//story database
const storieSchema = new mongoose.Schema({
    userId:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Stories",
        },
      imgUrl:{
        require:true,
        type:String
      },
      heading:{
        require:true,
        type:String
      },
      description:{
        require:true,
        type:String
      },
      category:{
        require:true,
        type:String
      },
      total_likes:{
        type:Number,
        require:true
      }
})

const Storie = new mongoose.model('Storie', storieSchema);

module.exports = Storie;