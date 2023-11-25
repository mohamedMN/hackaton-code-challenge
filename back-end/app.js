const express = require("express");
const app = express();
const dotenv = require("dotenv");
const user = require("./routes/user.route");
const recite = require("./routes/recete.route");
const { middleware } = require("./middleware/middleware");

// Load environment variables from .env file
dotenv.config();

// moiddlewares
app.use(middleware);

// Your routes go here (import and use them)

// Define a default route
app.use("/user", user);
app.use("/recite", recite);
module.exports = app;
