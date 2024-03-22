/*
 * File: market.js
 * Author: Edison Chung
 * Date: 3/22/24
 * Description: Defines the mongoose model for the market collection.
 */

const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema(
    {
        stockName: { type: String, required: true }, // name of the stock
        value: Number,                               // price of the stock
        description: String,                            // description of the stock
        lastUpdated: { type: Date, default: Date.now }, // last updated date
    },
    { collections: "market" }
);

const Market = mongoose.model("Market", marketSchema);

module.exports = Market;
