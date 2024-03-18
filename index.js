// Include packages
const mongoose = require("mongoose");
const express = require("express");
const adminRoute = require("./routes/adminRoute")
const userRoute = require("./routes/userRoute")

// const { MongoClient, ServerApiVersion } = require("mongodb");
const dbURI =
  "mongodb+srv://Blog_User:LQSkB6HM0aspKjT7@cluster0.qi6yla8.mongodb.net/BlogDB?retryWrites=true&w=majority";

// route our URL
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(3000, (req, res) =>
      console.log(`Connected to DB listening on port ${PORT}`)
    )
  )
  .catch((error) => console.error(error));

  app.use("/blogs", blogRoute)
  app.use("/api/user", userRoute)
  app.use("/api/admin", adminRoute)
