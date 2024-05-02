const bodyparser=require('body-parser');
const express = require('express');
const cors = require('cors');
const verifyToken = require('./middleware/verifyAccessToken');
require("dotenv").config();
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
const PORT = process.env.PORT||2000;
require('./service/conn');

app.use(express.json());

const likeStory = require("./apis/likeStory.js");
const updateStory = require("./apis/updateStory.js");
const bookmarkStory = require("./apis/bookMarkStories.js");
const createStory = require("./apis/createStorie.js");
const getStoriesByUserId = require("./apis/getStoryByUserId.js");
const getStoriesByStoryId = require("./apis/getStorybyStoryId.js");
const getAllStories = require("./apis/getAllStories.js");
const userRegister = require("./apis/userRegister.js");
const userLogin = require("./apis/userLogin.js");
const getStories = require('./apis/getStories.js');
const postStory = require('./apis/postStories.js');
const getBookmarks = require('./apis/getBookmarks.js');

// using verifyToken as middleware for authentication
app.put("/stories/likeStory",verifyToken, likeStory);
app.put("/stories/updateStory",verifyToken, updateStory);
app.put("/bookmark",verifyToken, bookmarkStory);
app.post("/createStory",verifyToken, createStory);
app.get("/stories/UserId/",verifyToken, getStoriesByUserId);
app.get("/stories/StoryId/:storyId",getStoriesByStoryId);
app.get("/getAllStories", getAllStories);
app.post('/user/register',userRegister);
app.post('/user/login',userLogin);
app.post('/user/storyByCategory',verifyToken, postStory);
app.get('/getStoriesByCategory/:category',getStories);
app.get('/user/getBookmarks',verifyToken,getBookmarks);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});