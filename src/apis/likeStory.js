
const User = require("../models/userDB.js"); 
const Storie = require("../models/storiesDB.js");

const likeStory = async (req, res) => {
  try {

    const { storyId } = req.body;
    const userId = req.user.userId;

    if (!storyId) {
      return res.status(400).json({ message: "Missing storyId in request body" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid user" }); 
    }

    const story = await Storie.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    const alreadyLiked = user.likes.find((like) => like.toString() === storyId);

    if (alreadyLiked) {
      // Unlike the story
      user.likes.pull(storyId);
      story.total_likes = story.total_likes - 1;
      await user.save();
      await story.save();
      res.json({ message: "Story unliked successfully" });
    } else {
      // Like the story
      user.likes.push(storyId);
      story.total_likes = story.total_likes + 1;
      await story.save();
      await user.save();
      res.json({ message: "Story liked successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error liking story" });
  }
};

module.exports = likeStory;
