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

router.post("/pictures/hero/update", async (req, res) => {
  console.log("Using Route : /pictures/hero/update");
  const urlCheck = /^((http|https|ftp):\/\/)/;
  const {
    title1,
    text1,
    title2,
    text2,
    title3,
    text3,
    title4,
    text4,
    title5,
    text5,
  } = req.fields;
  const picture1 = req.files.picture1
    ? req.files.picture1.path
    : req.fields.picture1;
  const picture2 = req.files.picture2
    ? req.files.picture2.path
    : req.fields.picture2;
  const picture3 = req.files.picture3
    ? req.files.picture3.path
    : req.fields.picture3;
  const picture4 = req.files.picture4
    ? req.files.picture4.path
    : req.fields.picture4;
  const picture5 = req.files.picture5
    ? req.files.picture5.path
    : req.fields.picture5;
  let newPicture1 = "";
  let newPicture2 = "";
  let newPicture3 = "";
  let newPicture4 = "";
  let newPicture5 = "";

  try {
    if (!urlCheck.test(picture1)) {
      const result = await cloudinary.uploader.upload(picture1, {
        folder: "/swaraamusic/Hero Sliders",
      });
      newPicture1 = result.url;
    } else {
      newPicture1 = picture1;
    }
    if (!urlCheck.test(picture2)) {
      const result = await cloudinary.uploader.upload(picture2, {
        folder: "/swaraamusic/Hero Sliders",
      });
      newPicture2 = result.url;
    } else {
      newPicture2 = picture2;
    }
    if (!urlCheck.test(picture3)) {
      const result = await cloudinary.uploader.upload(picture3, {
        folder: "/swaraamusic/Hero Sliders",
      });
      newPicture3 = result.url;
    } else {
      newPicture3 = picture3;
    }
    if (!urlCheck.test(picture4)) {
      const result = await cloudinary.uploader.upload(picture4, {
        folder: "/swaraamusic/Hero Sliders",
      });
      newPicture4 = result.url;
    } else {
      newPicture4 = picture4;
    }
    if (!urlCheck.test(picture5)) {
      const result = await cloudinary.uploader.upload(picture5, {
        folder: "/swaraamusic/Hero Sliders",
      });
      newPicture5 = result.url;
    } else {
      newPicture5 = picture5;
    }
    const heroSliders = await HeroSlider.find();

    heroSliders[0].text = text1;
    heroSliders[0].title = title1;
    heroSliders[0].picture = newPicture1;
    heroSliders[1].text = text2;
    heroSliders[1].title = title2;
    heroSliders[1].picture = newPicture2;
    heroSliders[2].text = text3;
    heroSliders[2].title = title3;
    heroSliders[2].picture = newPicture3;
    heroSliders[3].text = text4;
    heroSliders[3].title = title4;
    heroSliders[3].picture = newPicture4;
    heroSliders[4].text = text5;
    heroSliders[4].title = title5;
    heroSliders[4].picture = newPicture5;
    await heroSliders[0].save();
    await heroSliders[1].save();
    await heroSliders[2].save();
    await heroSliders[3].save();
    await heroSliders[4].save();
    res.status(200).json(heroSliders);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
