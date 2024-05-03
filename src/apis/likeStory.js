const StoryByCategory = require("../models/storyByCategoryDB");
const User = require("../models/userDB");

const likeStory = async (req, res) => {
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

    const hasLiked = await user.likes.includes(storyId);
    // Update total_likes and user's likes array based on whether the user has already liked the story
    if (hasLiked) {
      // Decrement total_likes and remove storyId from user's likes
      await StoryByCategory.updateOne(
        { "arrayOfStories._id": storyId },
        { $inc: { "arrayOfStories.$.total_likes": -1 } }
      );
      user.likes.pull(storyId);
    } else {
      // Increment total_likes and add storyId to user's likes
      await StoryByCategory.updateOne(
        { "arrayOfStories._id": storyId },
        { $inc: { "arrayOfStories.$.total_likes": 1 } }
      );
      user.likes.push(storyId);
    }

    await user.save();
    await story.save();
    res.json({ message: "Story like/unlike updated successfully", user:user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating story like" });
  }
};

module.exports = likeStory;
