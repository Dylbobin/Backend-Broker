// Include packages
const express = require("express");
const router = express.Router();
const Market = require("../model/market");

// get /market: Get all stock information
// get /market/{id}: Get information about a stock
// post /market: post a stock
// put /market/{id}: Update a stock's  information
// delete /market/{id}: delete a stock

router.get("/", async (req, res) => {
    try {
        const market = await Market.find({});
        res.status(200).send(market);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const market = await Market.findById(req.params.id);
        if (!market) {
            res.status(404).send();
        }
        console.log(
            `This is stock ${market.stockName}\n with a value of ${market.value}. Here is the description: ${market.description} and was last updated on ${market.lastUpdated}`
        );
        res.status(200).send(market);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/", async (req, res) => {
    const { stockName, value, description } = req.body;
    const market = new Market({
        stockName,
        value,
        description,
    });
    try {
        await market.save();
        res.status(201).send(market);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const market = await Market.findByIdAndUpdate(req.params.id);
        if (!market) {
            res.status(404).send();
        }
        res.status(200).send(market);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const market = await Market.findByIdAndDelete(req.params.id);
        if (!market) {
            res.status(404).send();
        }
        res.status(200).send(market);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
