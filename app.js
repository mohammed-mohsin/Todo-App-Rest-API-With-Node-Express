// Basic
const express = require("express");

const router = require("./src/routes/api");

const app = new express();

const bodyParser = require("body-parser");

// Security Middleware\

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// Database

const mongoose = require("mongoose");

// Security Middleware Implementation

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Body Parser Implementation
app.use(bodyParser.json());

// Request Limiter Implementation

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3000, // 15 minutes
});

app.use(limiter);

// Mongo DB Connection

let URI = "mongodb://localhost:27017/Todo";

let OPTION = { user: "", pass: "" };

mongoose.connect(URI, OPTION, (error) => {
  console.log("Connection Success");
  console.log(error);
});

// Routing Implementation

app.use("/api/v1", router);

// Undefined Route Implementation

app.use("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Not Found",
  });
});


module.exports = app;