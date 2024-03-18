// Include packages
const express = require("express");
const router = express.Router()
const Admin = require('../model/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// register admin
router.post("/register", async (req, res) => {
    try {
      const newPassword = await bcrypt.hash(req.body.password, 10)
      await Admin.create({
        name: req.body.name,
        email: req.body.email,
        password: newPassword
      })
      res.status(200).send("Admin added to database")
    } catch(error) {
      res.json({ status: "error", error: "Duplicate email"})
    }
  })


// admin login
router.post('/login', async (req, res) => {
    const admin = await Admin.findOne({
        email: req.body.email
    })
  
    if(!admin) {
      return{status: "error", error: "Invalid Login"};
    }
  
    // compare password with one in database
    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        admin.password
    )
  
    // if password is found
    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: admin.name,
                email: admin.email,
            },
            // unique value in order to encrypt password
            'secret@123'
        )
        // return the user token - we can take this token and store it on the browser 
        return res.json({status: 'ok', admin: token});
    } else {
        return res.json({status: 'error', admin: false})
    }
  })
  
  module.exports = router;