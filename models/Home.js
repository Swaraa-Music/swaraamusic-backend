// Model for About

const mongoose = require("mongoose");

const Home = mongoose.model("Home", {
  text: String,
  title: String,
  subTitle: String,
  image: String,
});

module.exports = Home;
