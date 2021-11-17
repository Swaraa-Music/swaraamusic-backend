// Model for Testimonals

const mongoose = require("mongoose");

const Testimonal = mongoose.model("Testimonal", {
  author: String,
  event: String,
  testimonial: String,
});

module.exports = Testimonal;
