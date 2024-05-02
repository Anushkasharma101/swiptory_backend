const User = require("../models/userDB");
const dotenv = require('dotenv');
dotenv.config();

const getBookmarks = async (req, res) => {
    try {
        const userId  = req.user.userId
  
      // Find the user by email
      const user = await User.findOne({ _id: userId});
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).send({ bookmarks: user.bookmark });
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  module.exports = getBookmarks;