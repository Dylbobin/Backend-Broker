const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

// register user
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

// login user
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

// Delete a user with user id
router.delete("/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// resetting the user's password
router.put("/resetPassword", async (req, res) => {
  // Extract the JWT from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // If no token is provided, return an unauthorized status
  if (token == null) return res.sendStatus(401);

  try {
    // Verify the JWT to ensure it's valid and decode it
    const decoded = jwt.verify(token, "secret@123");

    // Find the user in the database by email decoded from the JWT
    const user = await User.findOne({
      email: decoded.email,
    });

    // If no user is found with that email, return an error response
    if (!user) {
      return res.json({ status: "error", error: "Not a authorized User" });
    }

    const newPassword = await bcrypt.hash(req.body.password, 10);

    // Update the user's password in the database
    await User.updateOne(
      { email: decoded.email },
      { $set: { password: newPassword } }
    );

    return res.json({ status: "Ok" });
  } catch (error) {
    return res.json({ status: "error", error: "Invalid Token" });
  }
});

//changing the user's email
router.patch("/changeEmail", async (req, res) => {
  // Similar structure to the previous route
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, "secret@123");

    const user = await User.findOne({
      email: decoded.email,
    });

    if (!user) {
      return res.json({ status: "error", error: "Not a authorized User" });
    }

    const newEmail = req.body.email;

    // Update the user's email in the database
    await User.updateOne(
      { email: decoded.email },
      { $set: { email: newEmail } }
    );

    return res.json({ status: "Ok" });
  } catch (error) {
    return res.json({ status: "error", error: "Invalid Token" });
  }
});

//retrieving the user's stocks
router.get("/stocks", async (req, res) => {
  // Similar structure to the previous routes
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, "secret@123");

    const user = await User.findOne({
      email: decoded.email,
    });

    if (!user) {
      return res.json({ status: "error", error: "Not a authorized User" });
    }

    // Send the user's stocks in the response
    return res.status(200).send({ stocks: user.stocks });
  } catch (error) {
    return res.json({ status: "error", error: "Invalid Token" });
  }
});

module.exports = router;
