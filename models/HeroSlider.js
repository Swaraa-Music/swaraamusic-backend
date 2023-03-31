// Model for Hero Sliders

const mongoose = require("mongoose");

const HeroSlider = mongoose.model("HeroSlider", {
  _id: String,
  picture: String,
  text: String,
  title: String,
});

module.exports = HeroSlider;
