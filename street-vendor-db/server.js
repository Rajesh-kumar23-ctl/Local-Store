const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Models
const Supplier = require("./models/Supplier");
const Buyer = require("./models/Buyer");
const Review = require("./models/Review");

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/buyers", require("./routes/buyerRoutes"));
app.use("/api/suppliers", require("./routes/supplierRoutes"));

// ===== PUT & DELETE for Supplier =====
app.put('/api/suppliers/:id', async (req, res) => {
  try {
    const updated = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/suppliers/:id', async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== PUT & DELETE for Buyer =====
app.put('/api/buyers/:id', async (req, res) => {
  try {
    const updated = await Buyer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/buyers/:id', async (req, res) => {
  try {
    await Buyer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== Reviews =====
app.post('/api/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const query = req.query.vendorId ? { vendorId: req.query.vendorId } : {};
    const reviews = await Review.find(query);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

