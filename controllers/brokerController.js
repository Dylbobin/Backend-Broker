
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Broker = require('../model/broker');

exports.registerBroker = async (req, res) => {
    try {
        // Validate the incoming data 
        
        // Check if the broker already exists
        const existingBroker = await Broker.findOne({ email: req.body.email });
        if (existingBroker) {
            return res.status(409).json({ message: 'Broker exists.' });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        // Create a new broker
        const broker = new Broker({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
    
        });
        
        // Save the broker in the database
        const newBroker = await broker.save();
        
        res.status(201).json({ message: 'Broker registered successfully.', brokerId: newBroker._id });
    } catch (error) {
        res.status(500).json({ message: 'Error registering broker.', error: error.message });
    }
};

exports.loginBroker = async (req, res) => {
    try {
        // Validate the incoming data 
        
        // Check if the broker exists
        const broker = await Broker.findOne({ email: req.body.email });
        if (!broker) {
            return res.status(404).json({ message: 'Broker not found.' });
        }
        
        // Compare the provided password with the hashed password in the database
        const isValid = await bcrypt.compare(req.body.password, broker.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        
        // Generate a token
        const token = jwt.sign(
            { brokerId: broker._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.status(200).json({ token: token, brokerId: broker._id });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in.', error: error.message });
    }
};

exports.handleStocks = async (req, res) => {
    // Placeholder for handling stocks, to be implemented
    res.status(501).send('Not Implemented');
};

exports.executeTrade = async (req, res) => {
    // Placeholder for executing a trade, to be implemented
    res.status(501).send('Not Implemented');
};

exports.updateStocks = async (req, res) => {
    // Placeholder for updating stocks, to be implemented
    res.status(501).send('Not Implemented');
};
