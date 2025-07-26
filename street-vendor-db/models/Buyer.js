const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  gmail: { type: String },
  location: {
    pincode: { type: String ,required: true},
    city: { type: String ,required: true},
    state: { type: String ,required: true},
  },
  cart: { type: Array, default: [] },
  automaticOrder: {
    enabled: { type: Boolean, default: false },
    days: [{ type: String }]
  }
});

module.exports = mongoose.model("Buyer", buyerSchema);
