const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema(
    {
        stockName: { type: String, required: true },
        value: Number,
        description: String,
        lastUpdated: { type: Date, default: Date.now },
    },
    { collections: "market" }
);

const Market = mongoose.model("Market", marketSchema);

module.exports = Market;
