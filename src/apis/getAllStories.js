const express = require("express");
const Storie = require("../models/storiesDB");

const getAllStories = async (req, res) => {
  try {
    const stories = await Storie.find(); // Fetch all stories
    res.json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching stories" });
  }
};

module.exports = getAllStories;