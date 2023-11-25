const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
// Get the port from environment variables or use a default value
const connection = require("./config/database.js");

// calling connection function
connection();

// Import and use routes
const APP = require("./app.js");
app.use("/", APP);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
