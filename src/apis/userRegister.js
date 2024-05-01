const User = require("../models/userDB");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const userRegister = async (req, res) => {
    try {
      const { username,password } = req.body;
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword)
  
      const user = new User({
        username,
        password:hashedPassword
      });
  
      const createUser = await user.save();
  
      // Generate a Bearer token after successful registration
      console.log(createUser._id);
      const token = jwt.sign({ userId: createUser._id}, `${process.env.SECREAT_KEY}`);

      console.log(token);
      // Include the token in the response
      res.status(200).send({ user: createUser, token });
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  };

  module.exports = userRegister;