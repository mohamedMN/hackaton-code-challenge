const express = require("express");
const {
  login,
  logOut,
  registerUser,
} = require("../controller/auth.controller");
const { isLogin } = require("../middleware/auth.middleware");
const router = express.Router();
router.post("/authentication", login);
router.post("/register", registerUser);

router.post("/logout", isLogin, logOut);

module.exports = router;
