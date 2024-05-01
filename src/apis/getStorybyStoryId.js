const Storie = require("../models/storiesDB")

const getStoryById = async (req, res) => {
    try {
      const { storyId } = req.body; // Destructure storyId from request body
  
      if (!storyId) {
        return res.status(400).json({ message: "Missing storyId in request body" });
      }
  
      const story = await Storie.findById(storyId); // Find story by ID
  
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
  
      res.json(story);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching story" });
    }
  };
  
  module.exports = getStoryById;