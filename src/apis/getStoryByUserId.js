const Storie = require("../models/storiesDB")

const getStoriesByUserId = async (req, res) => {
    try {
      const userId = req.user.userId;
      
      if (!userId) {
        return res.status(400).json({ message: "Missing userId in request body" });
      }

      const stories = await Storie.find({ userId }); // Filter by userId
      res.json(stories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching stories" });
    }
  };

  module.exports = getStoriesByUserId;