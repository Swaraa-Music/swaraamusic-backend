// Model for Hero Sliders

const mongoose = require("mongoose");

const HeroSlider = mongoose.model("HeroSlider", {
  picture: String,
  text: String,
  title: String,
});

module.exports = HeroSlider;
