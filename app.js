const express = require("express");
const morgan = require("morgan");
const app = express();

// middleware untuk membaca json dari request body ke kita
app.use(express.json());

// middleware dari third party = 3rd party middleware
app.use(morgan("dev"));

const carRouter = require("./routes/carRouter.js");

// middleware kita sendiri
app.use((req, res, next) => {
  console.log("Test ");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1", carRouter);
app.use("/", carRouter);

module.exports = app;
