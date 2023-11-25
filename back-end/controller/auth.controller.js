const { v4 } = require("uuid"); // Import the uuid package and generate a v4 UUID
const User = require("../models/User.model");

const passport = require("passport");
const { authUser, register } = require("./passport-config");
const LocalStrategy = require("passport-local").Strategy;
passport.use("local-user", new LocalStrategy(authUser));

const login = async (req, res) => {
  try {
    const USER = await new Promise((resolve, reject) => {
      passport.authenticate("local-user", { session: true }, (err, user) => {
        if (err || !user) {
          return reject("Authentication failed!");
        }
        resolve(user);
      })(req, res);
    });
    req.session.user = USER;
    await req.session.save;
    // Handle successful authentication
    res.status(200).json({ success: true, user: USER });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(401).json({ message: "invalid credentials" });
  }
};

const registerUser = async (req, res) => {
  try {
    // Validation checks using express-validator
    await Promise.all([
      check("firstName")
        .notEmpty()
        .withMessage("First name is required")
        .run(req),
      check("lastName")
        .notEmpty()
        .withMessage("Last name is required")
        .run(req),
      check("email").isEmail().withMessage("Valid email is required").run(req),
      check("userName").notEmpty().withMessage("Username is required").run(req),
      check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .run(req),
    ]);
    // Destructure validated inputs
    let { firstName, lastName, email, userName, password } = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors });
    }

    const newUser = await register(
      firstName,
      lastName,
      email,
      userName,
      password
      //   data
    );

    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logOut = async (req, res, next) => {
  try {
    console.log("user logOut " + req.session.user);
    const userId = req.session.user;
    const currentTime = new Date();
    const user = await User.findOne({ _id: userId });

    await User.updateOne(
      { _id: user._id },
      { $set: { last_login: currentTime } }
    );

    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      console.log("user " + req.session.user);
      // res.redirect("/");
      res.status(200).json({ message: "logout success" });
    });
  } catch (error) {
    console.log("there's no user session to disconnected :", error);
  }
};

passport.serializeUser((user, done) => {
  // console.log("user ", user);
  console.log("serializeUser called");
  done(null, user);
});
passport.deserializeUser((userObj, done) => {
  // console.log("---------> Deserialize Id");
  // console.log("userObj ", userObj);
  console.log("deserializeUser---- called");

  done(null, userObj);
});
module.exports = {
  login,
  logOut,
  registerUser,
};
