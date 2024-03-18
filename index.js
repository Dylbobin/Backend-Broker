// Include packages
const mongoose = require("mongoose");
const express = require("express");
const blogRoute = require("./routes/blogRoute")
const adminRoute = require("./routes/adminRoute")
const userRoute = require("./routes/userRoute")
require("dotenv").config()

// const { MongoClient, ServerApiVersion } = require("mongodb");
const dbURI =process.env.MONGODB_URL

// route our URL
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(3000, (req, res) =>
      console.log(`Connected to DB listening on port ${PORT}`)
    )
  )
  .catch((error) => console.error(error));

  app.use("/blogs", blogRoute)
  app.use("/api/user", userRoute)
  app.use("/api/admin", adminRoute)
