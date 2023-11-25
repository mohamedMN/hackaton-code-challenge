const express = require("express");
const {
  login,
  logOut,
  registerUser,
} = require("../controller/auth.controller");
const { isLogin } = require("../middleware/auth.middleware");
const router = express.Router();

// -----------------------------------------------------------------------------
// Route to handle user authentication
router.post("/authentication", login);

// Route to handle user registration
router.post("/register", registerUser);

// Route to handle user logout
router.post("/logout", isLogin, logOut);

module.exports = router;
