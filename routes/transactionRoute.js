/*
 * File: transactionRoute.js
 * Author: Chence Shi
 * Description: HTTP requests to retrieve all transactions, add a transaction, retrieve a transaction by ID, update a transaction, and delete a transaction.
 */

// Include packages
const express = require("express");
const router = express.Router();
const Transaction = require("../model/transaction");

// retrieve all transactions
router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find({});

        res.status(200).send(transactions);
    } catch (error) {
        res.status(500).send(error);
    }
});

// add an transaction
router.post("/", async (req, res) => {
    const transaction = new Transaction(req.body);
    try {
        await transaction.save();
        res.status(201).send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

// retrieve one transaction by id
router.get("/:id", async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            res.status(404).send("Transaction not found");
        }
        res.status(200).send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

// update an transaction
router.put("/:id", async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        if (!transaction) {
            res.status(404).send("Transaction not found");
        }
        res.status(200).send(transaction);
    } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).send(error);
    }
});

// delete an transaction
router.delete("/:id", async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) {
            res.status(404).send("Transaction not found");
        }
        res.status(200).send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
