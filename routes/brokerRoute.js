
const express = require('express');
const router = express.Router();
const brokerController = require('../controllers/brokerController');
const broker = require("../model/broker");

router.post('/register', brokerController.registerBroker);
router.post('/login', brokerController.loginBroker);
router.post('/stocks/:UID', brokerController.handleStocks);
router.post('/trade', brokerController.executeTrade);
router.put('/stocks/:UID', brokerController.updateStocks);

module.exports = router;
