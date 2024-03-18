// Include packages
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
// .. refering to exit and enter

// need to register the user - post to submit the data
router.post("/register", async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        });
        res.status(200).send("User added to database");
    } catch (error) {
        res.json({ status: "error", error: "Duplicate email" });
    }
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    });

    if (!user) {
        return { status: "error", error: "Invalid Login" };
    }

    // compare password with one in database
    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    );

    // if password is found
    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            // unique value in order to encrypt password
            "secret@123"
        );
        // return the user token - we can take this token and store it on the browser
        return res.json({ status: "ok", user: token });
    } else {
        return res.json({ status: "error", user: false });
    }
});

router.post("/quote", async (req, res) => {
    const authHeader = req.headers["authorization"];
    // split up the name and token
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);

    if (token == null) {
        return res.sendStatus(401);
    }
    try {
        // if token is there verify with secret phrase
        const decoded = jwt.verify(token, "secret@123");
        // decode email if found
        //const  email = decoded.email
        // review in mongoose doc
        // if the body is there pass the body

        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.json({ status: "error", error: "Not a user" });
        }

        await User.updateOne(
            { email: decoded.email },
            { $set: { quote: req.body.quote } }
        );

        return res.json({ status: "Ok" });
    } catch (err) {
        return res.json({ status: "error", error: "Invalid Token" });
    }
});

module.exports = router;
