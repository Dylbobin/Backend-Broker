const mongoose = require('mongoose');

const brokerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Broker = mongoose.model('Broker', brokerSchema);

module.exports = Broker;
