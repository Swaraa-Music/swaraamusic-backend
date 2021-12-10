const express = require("express");
const router = express.Router();
const About = require("../models/About");

router.get(`/abouts`, async (req, res) => {
  console.log("Using Route : /abouts");
  console.log(req.query);
  try {
    const abouts = await About.find();
    res.status(200).json(abouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/about/create", async (req, res) => {
  console.log("Using Route : /about/create");
  try {
    const { text, title, subTitle } = req.fields;

    const newAbout = await new About({
      text,
      title,
      subTitle,
    });
    newAbout.save();
    res.status(200).json(newAbout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/about/update", async (req, res) => {
  console.log("Using Route : /about/update");
  try {
    const { text, title, subTitle, id } = req.fields;
    const about = await About.findById(id);
    about.text = text;
    about.title = title;
    about.subTitle = subTitle;
    about.save();
    res.status(200).json(about);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
