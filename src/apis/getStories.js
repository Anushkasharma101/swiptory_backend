const StoryByCategory = require("../models/storyByCategoryDB"); // Assuming model path

const getStories = async (req, res) => {
  try {
    // Extract category from URL parameters
    const { category } = req.params;
    // Validate category presence
    if (!category) {
      return res.status(400).json({ message: 'Missing required parameter: category' });
    }else{
      console.log(category);
    }

    const stories = await StoryByCategory.find({ category });
    if (!stories) {
      return res.status(404).json({ message: 'No stories found in this category' });
    }

    res.status(200).json({ message: "Stories retrieved successfully", stories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching stories' });
  }
};

module.exports = getStories;
