const express = require("express");
const router = express.Router();
const Header = require("../models/header");

router.get(`/header`, async (req, res) => {
  try {
    const header = await Header.find();
    res.status(200).json(header);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/header/create", async (req, res) => {
  try {
    const { contact1, contact2 } = req.fields;

    const newHeader = await new Header({
      contact1,
      contact2,
    });
    newHeader.save();
    res.status(200).json(newHeader);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/header/update", async (req, res) => {
  try {
    const { contact1, contact2 } = req.fields;
    const header = await Header.find();

    header[0].contact1 = contact1 || "";
    header[0].contact2 = contact2 || "";
    await header[0].save();
    res.status(200).json(header);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
