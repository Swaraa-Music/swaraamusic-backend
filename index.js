// Packages
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const formidable = require("express-formidable");
app.use(formidable());
const cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE, OPTIONS");

  next();
});

mongoose.set("strictQuery", true);

// Database configuration
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
// const mailsRoutes = require("./routes/mails");
// app.use(mailsRoutes);
const picturesRoutes = require("./routes/pictures");
app.use(picturesRoutes);
const testimonialsRoutes = require("./routes/testimonials");
app.use(testimonialsRoutes);
const aboutRoutes = require("./routes/about");
app.use(aboutRoutes);

const homeRoutes = require("./routes/home");
app.use(homeRoutes);

const headerRoutes = require("./routes/header");
app.use(headerRoutes);

app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
