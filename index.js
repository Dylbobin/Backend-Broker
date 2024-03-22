// Include packages
const mongoose = require("mongoose");
const express = require("express");
const blogRoute = require("./routes/blogRoute");
const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");
const brokerRoute = require('./routes/brokerRoute');
require("dotenv").config();

// Initialize express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Environment variables
const dbURI = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(dbURI)
  .then((result) => {
    // Start the server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Connected to DB and listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));

// Use routes
app.use("/blogs", blogRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use('/api/broker', brokerRoute);

// Optional: Define a root route
app.get('/', (req, res) => {
  res.json({ message: 'API is up and running!' });
});
