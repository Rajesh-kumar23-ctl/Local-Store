const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  gmail: { type: String },
  location: {
    pincode: { type: String },
    city: { type: String },
    state: { type: String },
  },
  cart: { type: Array, default: [] },
  automaticOrder: {
    enabled: { type: Boolean, default: false },
    days: [{ type: String }]
  }
});

module.exports = mongoose.model("Buyer", buyerSchema);
