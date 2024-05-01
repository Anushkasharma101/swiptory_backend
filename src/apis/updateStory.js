const Storie = require("../models/storiesDB");
const User = require("../models/userDB")

const updateStory = async (req, res) => {
    
    const {storyId, imgUrl, heading, description } = req.body; // Optional fields

    const userId = req.user.userId;
    
    try {
      const story = await Storie.findById(storyId);
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "Invalid user" });
      }
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
  
      // Update only the specified fields (avoid overwriting with empty values)
      story.set({
        imgUrl: imgUrl ? imgUrl : story.imgUrl,
        heading: heading ? heading : story.heading,
        description: description ? description : story.description,
      });
  
      await story.save();
  
      res.status(200).json({ message: "Story updated successfully", story });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating story" });
    }
  };
  
  module.exports = updateStory;