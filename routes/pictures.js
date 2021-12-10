const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const HeroSlider = require("../models/HeroSlider");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get(`/pictures`, async (req, res) => {
  console.log("Using Route : /pictures");
  console.log(req.query);

  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "swaraamusic/Past Gigs", // add your folder
      max_results: 500,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/picture/create", async (req, res) => {
  console.log("Using Route : /picture/create");

  try {
    const picture = req.files.picture.path;
    console.log(picture);
    const result = await cloudinary.uploader.upload(picture, {
      folder: "/swaraamusic/Past Gigs",
    });
    newPicture = result.url;
    console.log(newPicture);
    res.status(200).json({ message: "Your picture has been uploaded!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/picture/delete", async (req, res) => {
  console.log("Using Route : /picture/delete");

  try {
    const picture = req.fields.publicId;
    console.log(picture);
    await cloudinary.uploader.destroy(picture);

    res.status(200).json({ message: "The picture has been deleted!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// Hero Slider

router.get(`/pictures/hero`, async (req, res) => {
  console.log("Using Route : /pictures/hero");
  console.log(req.query);
  try {
    const heroSliders = await HeroSlider.find();
    res.status(200).json(heroSliders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/picture/hero/create", async (req, res) => {
  console.log("Using Route : /picture/hero/create");
  const { title, text } = req.fields;

  try {
    const picture = req.files.picture.path;
    console.log(picture);
    const result = await cloudinary.uploader.upload(picture, {
      folder: "/swaraamusic/Hero Sliders",
    });

    const newHeroSlider = await new HeroSlider({
      title: title,
      text: text,
      picture: result.url,
    });

    newHeroSlider.save();
    res.status(200).json(newHeroSlider);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
