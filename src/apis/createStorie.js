const Storie = require("../models/storiesDB");
const User = require("../models/userDB");
const createStory = async (req, res) => {
    const { imgUrl,heading,description,category} = req.body;
    const userId = req.user.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }
    const newStory = new Storie({
      userId, // Use userId from verified token
      imgUrl,
      heading,
      description,
      category,
      total_likes:0,
    });

    await newStory.save();
    res.status(201).json({ message: "Story created successfully", story: newStory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating story" });
  }
};

module.exports = createStory;