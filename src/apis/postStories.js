const StoryByCategory = require("../models/storyByCategoryDB");
const User = require("../models/userDB");

const postStory = async (req, res) => {
  try {
    const { category, arrayOfStories } = req.body;
    const userId = req.user.userId;
    // Check for missing fields in request body
    if (!category || !arrayOfStories) {
      return res
        .status(400)
        .json({ message: "Missing required fields in request body" });
    }

    // Check for empty arrayOfStories
    if (arrayOfStories.length === 0) {
      return res
        .status(400)
        .json({ message: "arrayOfStories must contain at least one story" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    // Check each element in arrayOfStories for required fields
    for (const story of arrayOfStories) {
      if (
        !story.imgUrl ||
        !story.heading ||
        !story.description ||
        typeof story.total_likes !== "number"
      ) {
        return res
          .status(400)
          .json({ message: "Invalid story data in arrayOfStories" });
      }
    }

    const newStory = new StoryByCategory({
      category,
      arrayOfStories,
      userId
    });

    await newStory.save();

    return res
      .status(201)
      .json({ message: "Story created successfully", story: newStory });
  } catch (error) {
    console.error(error);

    // Handle Mongoose validation errors (optional)
    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res
        .status(400)
        .json({ message: "Validation errors", errors: validationErrors });
    }

    return res.status(500).json({ message: "Error creating story" });
  }
};

module.exports = postStory;
