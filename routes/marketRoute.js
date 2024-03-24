/*
 * File: marketRoute.js
 * Author: Edison Chung
 * Description: HTTP requests to getting all stock information, getting stock information by ID, posting a stock, updating a stock by ID,
 *             and deleting a stock by ID.
 */

// Include packages
const express = require("express");
const router = express.Router();
const Market = require("../model/market");

// Get all stock information
router.get("/", async (req, res) => {
    try {
        const market = await Market.find({});
        res.status(200).send(market);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get information about a specific stock by ID
router.get("/:id", async (req, res) => {
    try {
        const market = await Market.findById(req.params.id);
        if (!market) {
            res.status(404).send();
        }
        console.log(
            `This is stock ${market.stockName} with a value of ${market.value}. Here is the description: ${market.description} and was last updated on ${market.lastUpdated}`
        );
        res.status(200).send(market);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Post a stock
router.post("/", async (req, res) => {
    const { stockName, value, description } = req.body;
    const market = new Market({
        stockName,
        value,
        description,
    });
    try {
        await market.save();
        res.status(201).send({ market, id: market.id });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a stock's information by ID
router.patch("/:id", async (req, res) => {
    try {
        const market = await Market.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!market) {
            res.status(404).send();
        }
        res.status(200).send(market);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a stock by ID
router.delete("/:id", async (req, res) => {
    try {
        const market = await Market.findByIdAndDelete(req.params.id);
        if (!market) {
            res.status(404).send();
        }
        res.status(200).send(`${market.stockName} has been deleted.`);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
