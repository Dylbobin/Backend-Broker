const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    industry: String,
    value: Number,
    lastUpdated: { type: Date, default: Date.now },
});

const Market = mongoose.model("Market", marketSchema);

module.exports = Market;
