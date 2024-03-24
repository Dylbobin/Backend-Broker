/*
 * File: adminRoute.js
 * Author: Dylan Silva\
 * Description: HTTP requests to register and login an admin, update an admin by ID, and delete an admin by ID.
 */

// Include packages
const express = require("express");
const router = express.Router();
const Admin = require("../model/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*-------------------------------------- Login/Register -------------------------------------- */

// register admin
router.post("/register", async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await Admin.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        });
        res.status(200).send("Admin added to database");
    } catch (error) {
        res.json({ status: "error", error: "Duplicate email" });
    }
});

// admin login
router.post("/login", async (req, res) => {
    const admin = await Admin.findOne({
        email: req.body.email,
    });

    if (!admin) {
        return { status: "error", error: "Invalid Login" };
    }

    // compare password with one in database
    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        admin.password
    );

    // if password is found
    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: admin.name,
                email: admin.email,
            },
            // unique value in order to encrypt password
            "BackEndBroker@123"
        );
        // return the user token - we can take this token and store it on the browser
        return res.json({ status: "ok", admin: token, id: admin._id });
    } else {
        return res.json({ status: "error", admin: false });
    }
});

/*-------------------------------------- PATCH -------------------------------------- */

// patch in order to update
router.patch("/:id", async (req, res) => {
    try {
        // find stock by id to update post
        // takes the given url and deletes by that exact block
        const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!stock) {
            // not found if cannot find
            res.status(404).send();
        }
        // if found
        res.status(200).send(stock);
    } catch (error) {
        res.status(500).send(error);
    }
});

/*-------------------------------------- DELETE USER, STOCK, BROKER -------------------------------------- */

// we want to preform a singular delete at a time for the admin
router.delete("/delete/:id", async (req, res) => {
    try {
        // find by id to delete
        // takes the given id and deletes by that exact block
        // take the id from the req body, provided after login
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            // not found if cannot find
            res.status(404).send();
        }
        // if found
        res.status(200).send("Admin deleted from the database");
    } catch (error) {
        res.status(500).send(error);
    }
});

// we want to preform a singular delete at a time for user
router.delete("/delete/user", async (req, res) => {
    try {
        // find by id to delete
        // takes the given id and deletes by that exact block
        // take the id from the req body, provided after login
        const id = req.body.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            // not found if cannot find
            res.status(404).send();
        }
        // if found
        res.status(200).send("User deleted from the database");
    } catch (error) {
        res.status(500).send(error);
    }
});

// we want to preform a singular delete at a time for user
router.delete("/delete/broker", async (req, res) => {
    try {
        // find by id to delete
        // takes the given id and deletes by that exact block
        // take the id from the req body, provided after login
        const id = req.body.id;
        const broker = await Broker.findByIdAndDelete(id);
        if (!broker) {
            // not found if cannot find
            res.status(404).send();
        }
        // if found
        res.status(200).send("User deleted from the database");
    } catch (error) {
        res.status(500).send(error);
    }
});

/*-------------------------------------- END -------------------------------------- */

module.exports = router;
