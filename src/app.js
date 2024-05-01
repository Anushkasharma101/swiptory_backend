const express = require('express');
const cors = require('cors');
const verifyToken = require('./middleware/verifyAccessToken');
require("dotenv").config();
const app = express();
app.use(cors());
const PORT = process.env.PORT||2000;
require('./service/conn');
app.use(express.json());

const likeStory = require("./apis/likeStory.js");
const updateStory = require("./apis/updateStory");
const bookmarkStory = require("./apis/bookMarkStories.js");
const createStory = require("./apis/createStorie");
const getStoriesByUserId = require("./apis/getStoryByUserId");
const getStoriesByStoryId = require("./apis/getStorybyStoryId");
const getAllStories = require("./apis/getAllStories");
const userRegister = require("./apis/userRegister");
const userLogin = require("./apis/userLogin");

// using verifyToken as middleware for authentication
app.put("/stories/likeStory",verifyToken, likeStory);
app.put("/stories/updateStory",verifyToken, updateStory);
app.put("/bookmark",verifyToken, bookmarkStory);
app.post("/createStory",verifyToken, createStory);
app.get("/stories/UserId",verifyToken, getStoriesByUserId);
app.get("/stories/StoryId",getStoriesByStoryId);
app.get("/getAllStories", getAllStories);
app.post('/user/register',userRegister);
app.post('/user/login',userLogin);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});