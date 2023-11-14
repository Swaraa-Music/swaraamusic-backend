// Model for About

const mongoose = require("mongoose");

const Header = mongoose.model("Header", {
  contact1: String,
  contact2: String,
});

module.exports = Header;
