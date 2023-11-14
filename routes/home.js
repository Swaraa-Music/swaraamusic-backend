const express = require("express");
const router = express.Router();
const Home = require("../models/Home");

router.get(`/home`, async (req, res) => {
  try {
    const home = await Home.find();
    res.status(200).json(home);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/home/create", async (req, res) => {
  try {
    const { text, title, subTitle, image } = req.fields;

    const newHome = await new Home({
      text,
      title,
      subTitle,
      image,
    });
    newHome.save();
    res.status(200).json(newHome);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/home/update", async (req, res) => {
  try {
    const {
      homeText1,
      homeTitle1,
      homeSubtitle1,
      homeText2,
      homeSubtitle2,
      homeTitle2,
      image,
    } = req.fields;
    const home = await Home.find();

    home[0].text = homeText1 || "";
    home[0].title = homeTitle1 || "";
    home[0].subTitle = homeSubtitle1 || "";
    home[1].title = homeTitle2 || "";
    home[1].text = homeText2 || "";
    home[1].subTitle = homeSubtitle2 || "";
    home[1].image = image || "";
    await home[0].save();
    await home[1].save();
    res.status(200).json(home);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
