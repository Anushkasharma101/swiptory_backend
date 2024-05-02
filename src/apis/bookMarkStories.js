const User = require("../models/userDB.js");
const StoryByCategory = require("../models/storyByCategoryDB");// Update import


const bookmarkStory = async (req, res) => {
  try {
    const { storyId } = req.body;
    const userId = req.user.userId;

    if (!storyId || !userId) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // Find the story
    const story = await StoryByCategory.findOne({ "arrayOfStories._id": storyId });
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Check if the user has already liked the story
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    const hasbookmarked = user.bookmark.includes(storyId);

    // Update total_likes and user's likes array based on whether the user has already liked the story
    if (hasbookmarked) {
      // Decrement total_likes and remove storyId from user's bookmark
      user.bookmark.pull(storyId);
    } else {
      // Increment total_likes and add storyId to user's bookmark
      user.bookmark.push(storyId);
    }

    await user.save();

    res.json({ message: "Story bookmark/unbookmark updated successfully", user:user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating story bookmark" });
  }
};

module.exports = bookmarkStory;
