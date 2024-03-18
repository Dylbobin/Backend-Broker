const express = require("express");
const router = express.Router();
const Broker = require("../model/broker");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
