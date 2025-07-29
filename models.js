// models/Stock.js
const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  likes: { type: [String], default: [] }, // store IPs or user IDs
});

module.exports = mongoose.model("Stock", stockSchema);
