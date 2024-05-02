const mongoose = require("mongoose");

// Import the User and StoryByCategory models
const User = require("../models/userDB");
const StoryByCategory = require("../models/storyByCategoryDB");  // Update path if needed

const updateStory = async (req, res) => {
  const { storyId, imgUrl, heading, description } = req.body; // Optional fields
  const userId = req.user.userId;

  try {
    // Find the user to verify ownership (assuming userId field in User schema)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    // Find the story within the arrayOfStories based on storyId
    const storyToUpdate = await StoryByCategory.findOne({
      "arrayOfStories._id": storyId,
    });

    if (!storyToUpdate) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Check if the story belongs to the authenticated user
    if (!storyToUpdate.userId.equals(userId)) {
      return res.status(401).json({ message: "Unauthorized to update story" });
    }

    // Update only the specified fields (avoid overwriting with empty values)
    const foundStory = storyToUpdate.arrayOfStories.id(storyId); // Get the specific story object from the array
    foundStory.set({
      imgUrl: imgUrl ? imgUrl : foundStory.imgUrl,
      heading: heading ? heading : foundStory.heading,
      description: description ? description : foundStory.description,
    });

    // Save the entire StoryByCategory document
    await storyToUpdate.save();

    res.status(200).json({ message: "Story updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating story" });
  }
};

module.exports = updateStory;
