const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require('multer');
const { Client } = require('@googlemaps/google-maps-services-js');
const Razorpay = require('razorpay');

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

// Google Maps Client
const googleMapsClient = new Client({});

// Razorpay Client
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Get Directions
app.get('/api/directions', async (req, res) => {
    const { buyerId, supplierId } = req.query;

    try {
        const buyer = await Buyer.findById(buyerId);
        const supplier = await Supplier.findById(supplierId);

        if (!buyer || !supplier) {
            return res.status(404).json({ error: 'Buyer or Supplier not found' });
        }

        const buyerAddress = `${buyer.location.pin}, ${buyer.location.city}, ${buyer.location.state}`;
        const supplierAddress = `${supplier.location.pin}, ${supplier.location.city}, ${supplier.location.state}`;

        const response = await googleMapsClient.directions({
            params: {
                origin: buyerAddress,
                destination: supplierAddress,
                key: process.env.GOOGLE_MAPS_API_KEY,
            },
            timeout: 1000, // milliseconds
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching directions:', error);
        res.status(500).json({ error: 'Error fetching directions' });
    }
});

// Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
    const { amount, currency } = req.body;

    const options = {
        amount: amount * 100, // Amount in paise
        currency: currency,
        receipt: 'receipt#1',
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Error creating order' });
    }
});

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Specify the filename
  }
});
const upload = multer({ storage: storage });
// Define your routes here
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
