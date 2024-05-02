const mongoose = require("mongoose");

// Story database schema
const StoryByCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  arrayOfStories: {
    type: [
      {
        _id:{
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId()
        },
        imgUrl: {
          type: String,
          required: true
        },
        heading: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        total_likes: {
          type: Number,
          required: true,
          default: 0 // Set a default value for total_likes
        }
      }
    ],
    required: true // Ensure arrayOfStories is not empty
  },
  userId:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
          require:true,
        },

});

const StoryByCategory = mongoose.model('StorieByCategories', StoryByCategorySchema);

module.exports = StoryByCategory;
