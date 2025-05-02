const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const items = require("./routes/api/items");

// Bodyparser Middleware
app.use(bodyParser.json());

// MongoDB connection
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on port $(port)"));
