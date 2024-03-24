const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Broker = require('../model/broker');

// Register broker
router.post('/register', async (req, res) => {
    try {
        const existingBroker = await Broker.findOne({ email: req.body.email });
        if (existingBroker) {
            return res.status(409).json({ message: 'Broker exists.' });
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        const broker = new Broker({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        
        const newBroker = await broker.save();
        res.status(201).json({ message: 'Broker registered successfully.', brokerId: newBroker._id });
    } catch (error) {
        res.status(500).json({ message: 'Error registering broker.', error: error.message });
    }
});

// Login broker
router.post('/login', async (req, res) => {
    try {
        const broker = await Broker.findOne({ email: req.body.email });
        if (!broker) {
            return res.status(404).json({ message: 'Broker not found.' });
        }
        
        const isValid = await bcrypt.compare(req.body.password, broker.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        
        const token = jwt.sign(
            { brokerId: broker._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.status(200).json({ token: token, brokerId: broker._id });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in.', error: error.message });
    }
});

// Handle stocks
router.post('/stocks/:UID', async (req, res) => {
    
    res.status(501).send('Not Implemented');
});

// Execute trade
router.post('/trade', async (req, res) => {
   
    res.status(501).send('Not Implemented');
});

// Update stocks
router.put('/stocks/:UID', async (req, res) => {
    
    res.status(501).send('Not Implemented');
});

module.exports = router;
