const StoryByCategory = require("../models/storyByCategoryDB");

const getStoryById = async (req, res) => {
  try {
    const { storyId } = req.params; // Destructure storyId from request parameters

    if (!storyId) {
      return res.status(400).json({ message: "Missing storyId in request parameters" });
    }

    const story = await StoryByCategory.findOne({
      "arrayOfStories._id": storyId,
    }); // Find story by ID

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Find the specific story object within arrayOfStories
    const foundStory = story.arrayOfStories.id(storyId);

    if (!foundStory) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json(foundStory); // Respond with the specific story object
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching story" });
  }
};

module.exports = getStoryById;
