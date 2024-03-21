// Include packages
const express = require('express');
const { mongoose } = require('mongoose');
const router = express.Router();
const Transaction = require('../model/transaction');

// retrieve all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find({});

        res.status(200).send(transactions);
    } catch (error) {
        res.status(500).send(error);
    }
});

// add an transaction
router.post('/', async (req, res) => {
    const transaction = new Transaction(req.body);
    try {
        await transaction.save();
        res.status(201).send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

// retrieve one transaction by id
router.get('/id', async (req, res) => {
    try {
        const transaction = await Transaction.find({ _id: req.query.id });
        if (!transaction) {
            res.status(404).send('Transaction not found');
        }
        res.status(200).send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

// update an transaction
router.put('/update', async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(
            req.query.id,
            req.body,
            {
                new: true,
            }
        );
        // console.log(trasaction);
        if (!transaction) {
            res.status(404).send('Transaction not found');
        }
        res.status(200).send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

// delete an transaction
router.delete('/delete', async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.query.id);
        if (!transaction) {
            res.status(404).send('Transaction not found');
        }
        res.status(200).send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
