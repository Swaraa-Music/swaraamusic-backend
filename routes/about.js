const express = require("express");
const router = express.Router();
const About = require("../models/About");

router.get(`/abouts`, async (req, res) => {
  try {
    const abouts = await About.find();
    res.status(200).json(abouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/about/create", async (req, res) => {
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
  try {
    const {
      aboutText1,
      aboutTitle1,
      aboutSubtitle1,
      aboutText2,
      aboutTitle2,
      aboutSubtitle2,
      aboutText3,
      aboutTitle3,
      aboutSubtitle3,
    } = req.fields;
    const about = await About.find();

    about[0].text = aboutText1 || "";
    about[0].title = aboutTitle1 || "";
    about[0].subTitle = aboutSubtitle1 || "";
    about[1].text = aboutText2 || "";
    about[1].title = aboutTitle2 || "";
    about[1].subTitle = aboutSubtitle2 || "";
    about[2].text = aboutText3 || "";
    about[2].title = aboutTitle3 || "";
    about[2].subTitle = aboutSubtitle3 || "";
    await about[0].save();
    await about[1].save();
    await about[2].save();
    res.status(200).json(about);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
