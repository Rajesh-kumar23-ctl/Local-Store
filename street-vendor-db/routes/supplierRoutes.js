const express = require("express");
const router = express.Router();
const Supplier = require("../models/Supplier");
const multer = require('multer');
const storage = multer.diskStorage({ /* same config */ });
const upload = multer({ storage: storage });

router.post("/", upload.single("productImage"), async (req, res) => {
  try {
    const supplier = new Supplier({
      name: req.body.name,
      location: req.body.location,
      products: req.body.products,
      productImage: req.file ? req.file.path : null,
    });
    await supplier.save();
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: "Failed to save supplier" });
  }
});

router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).send(err);
  }
});




module.exports = router;
