require('express-async-errors');
const express = require("express");
const start = require('./database');
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const userLogin = require("./routes/userLogin");
const statusRouter = require("./routes/status");
const errorHandler = require('./errorHandler/errorHandler');
const cors = require("cors");
const app = express();

// start database connection
start();
app.use(express.static("static"));
app.use(cors());
app.use(express.json());
// Routes
app.use('/', userLogin);
app.use('/', userRouter);
app.use('/', productRouter);
app.use('/', statusRouter);
// Error handler
app.use(errorHandler);

module.exports = app;
