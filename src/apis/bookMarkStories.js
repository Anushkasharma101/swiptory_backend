
const User = require("../models/userDB.js");
const Storie = require("../models/storiesDB.js"); 

const bookmarkStory = async (req, res) => {
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

    const alreadybooked = user.bookmark.find((bookmr) => bookmr.toString() === storyId);

    if (alreadybooked) {
      // Unbookmark the story
      user.bookmark.pull(storyId);
      await user.save();
      res.json({ message: "Story unbookmark successfully" });
    } else {
      // bookmark the story
      user.bookmark.push(storyId);
      await user.save();
      res.json({ message: "Story bookmark successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error liking story" });
  }
};

module.exports = bookmarkStory;
