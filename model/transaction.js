const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    symbol: { type: String, required: true },   // stock symbol
    amount: { type: String, required: true },    // value in this transaction
    type: { type: String, required: true },     // buy or sell
    fromId: { type: String, required: true },   // party A's id
    toId: { type: String, required: true },     // party B's id
    lastUpdated: { type: Date, default: Date.now },
});

const Transaction = new mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
