const mongoose = require("mongoose");

// Import the StoryByCategory model
const StoryByCategory = require("../models/storyByCategoryDB");  // Update path if needed

const getStoriesByUserId = async (req, res) => {
  try {
    const userId  = req.user.userId // Destructure userId from request parameters

    if (!userId) {
      return res.status(400).json({ message: "Missing userId in request parameters" });
    }

    // Find stories where userId matches the reference field
    const stories = await StoryByCategory.find({ userId });

    if (!stories || stories.length === 0) {
      return res.status(404).json({ message: "No stories found for this user" });
    }

    res.status(200).json({ message: "Stories retrieved successfully", stories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching stories" });
  }
};

module.exports = getStoriesByUserId;
