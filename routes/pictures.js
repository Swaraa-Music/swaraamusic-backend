const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

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
      prefix: "swaraamusic", // add your folder
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
      folder: "/swaraamusic",
    });
    newPicture = result.url;
    console.log(newPicture);
    res.status(200).json({ message: "Your picture has been uploaded!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
