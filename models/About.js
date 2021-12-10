// Model for About

const mongoose = require("mongoose");

const About = mongoose.model("About", {
  text: String,
  title: String,
  subTitle: String,
});

module.exports = About;
