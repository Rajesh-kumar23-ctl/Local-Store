const express = require("express");
const router = express.Router();
const Buyer = require("../models/Buyer");

router.post("/", async (req, res) => {
  try {
    const buyer = new Buyer(req.body);
    await buyer.save();
    res.status(201).send(buyer);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
