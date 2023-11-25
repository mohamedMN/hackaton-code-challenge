// Create an Express app
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const middleware = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const corsOptions = {
  origin: ["http://localhost:5534", "*"],
  // methods: ["*"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
// Define and use middleware
middleware
  .use(cors(corsOptions))
  .use(
    session({
      secret: "abcdefg",
      resave: true,
      saveUninitialized: false,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(express.json()) // This middleware parses JSON request bodies
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser("secret3"));

// Parse JSON in request bodies
module.exports = { middleware };
