const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  gmail: { type: String },
  location: {
    pincode: { type: String },
    city: { type: String },
    state: { type: String },
  },
  itemList: [{
    itemName: String,
    price: Number,
    quantityAvailable: Number
  }]
});

module.exports = mongoose.model("Supplier", supplierSchema);
