const StoryByCategory = require("../models/storyByCategoryDB");

const getStories = async (req, res) => {
    try {
        const {category} = req.body
        const stories = await StoryByCategory.find({ category });
        if (!stories) {
          return { status: 404, message: 'No stories found in this category' };
        }
    
        res
      .status(201)
      .json({ message: "Story got successfully", story: stories });
      } catch (error) {
        console.error(error);
        return { status: 500, message: 'Error fetching stories' };
      }
};

module.exports = getStories;
