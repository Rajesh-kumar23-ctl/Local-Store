const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  gmail: { type: String },
  location: {
    pin:   { type: String, required: true },
    place: { type: String, required: true },
    city:  { type: String, required: true },
    state: { type: String, required: true }
  },
  itemList: [{
    itemName: String,
    price: Number,
    quantityAvailable: Number
  }]
});

module.exports = mongoose.model("Supplier", supplierSchema);
