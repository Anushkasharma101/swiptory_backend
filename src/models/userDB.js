const mongoose = require("mongoose");

//user database
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:[ true , "User Name already present"],
    },
        password:{
            type:String,
            require: true
        },
        likes:[
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Storiebycategories",
            },
          ],
        bookmark:[
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Storiebycategories",
            },
          ],
})

const User = new mongoose.model('User', userSchema);

module.exports = User;