const mongoose = require("mongoose");
const express = require("express");
const adminRoute = require("./routes/adminRoute");
const brokerRoute = require("./routes/brokerRoute");
const marketRoute = require("./routes/marketRoute");
const transactionRoute = require("./routes/transactionRoute");
const userRoute = require("./routes/userRoute");
require("dotenv").config();

const dbURI = process.env.MONGODB_URL;

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(PORT, (req, res) =>
      console.log(`Connected to DB listening on port ${PORT}`)
    )
  )
  .catch((error) => console.error(error));

  app.use("/api/admin", adminRoute);
  app.use("/api/broker", brokerRoute);
  app.use("/api/market", marketRoute);
  app.use("/api/transaction", transactionRoute);
  app.use("/api/user", userRoute);
