const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");

router.get(`/testimonials`, async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/testimonial/create", async (req, res) => {
  try {
    const { author, event, testimonial } = req.fields;

    const newTestimonial = await new Testimonial({
      author,
      event,
      testimonial,
    });
    newTestimonial.save();
    res.status(200).json({
      _id: newTestimonial._id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/testimonial/delete", async (req, res) => {
  try {
    const testimonial = req.fields.testimonialId;

    await Testimonial.findByIdAndDelete(testimonial);

    res.status(200).json({ message: "The testimonial has been deleted!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
