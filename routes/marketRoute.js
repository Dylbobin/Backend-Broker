// Include packages
const express = require("express");
const router = express.Router();
const Market = require("../model/market");

// post to app
// two objects request and response
router.post("/", async (req, res) => {
    // for specific body JSON
    /* console.log(req.body) */

    const blog = new Blog(req.body);
    try {
        // save in body in blog model
        await blog.save();
        res.status(201).send(blog);
        //console.log(blog) - for terminal/online log
    } catch (error) {
        // catch error, send error and code
        res.status(500).send(error);
        //console.log(error)
    }
});

// get method to retrieve blogs
router.get("/", async (req, res) => {
    try {
        //blogs find all
        const blogs = await Blog.find({});
        // send ok status
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).send(error);
    }
});

// we want to preform a singular delete at a time
router.delete("/:id", async (req, res) => {
    try {
        //blogs find by id to delete
        // takes the given url and deletes by that exact block
        const stock = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            // not found if cannot find
            res.status(404).send();
        }
        // if found
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).send(error);
    }
});

// patch in order to update
router.patch("/:id", async (req, res) => {
    try {
        //blogs find by id to update blog
        // takes the given url and deletes by that exact block
        const blogs = await Market.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!blog) {
            // not found if cannot find
            res.status(404).send();
        }
        // if found
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).send(error);
    }
});

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
        res.status(200).send(market);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/", async (req, res) => {
    const market = new Market(req.body);
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
