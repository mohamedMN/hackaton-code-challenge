const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid"); // Import the uuid package and generate a v4 UUID

require("dotenv").config();
bcryptSalt = process.env.BCRYPT_SALT;
const authUser = async (username, password, done) => {
  try {
    console.log("Username or Email: " + username + " Password: " + password);

    // Check if the input is an email address
    const isEmail = username.includes("@");

    // Search for a user based on either username or email
    const fieldToSearch = isEmail ? "email" : "user_name";
    // console.log("fieldToSearch ",fieldToSearch)
    const data = await User.findOne({ [fieldToSearch]: username });

    if (!data)
      return done(null, false, {
        message: "Cannot find user with that username",
      });
    const checkPassword = await bcrypt.compare(password, data.password);
    if (!checkPassword)
      return done(null, false, { message: "Incorrect password" });
    if (data) {
      done(null, data);
    }
  } catch (err) {
    return done(err);
  }
};
const register = async (
  firstName,
  lastName,
  email,
  userName,
  password,
  data
  // role
) => {
  try {
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, Number(bcryptSalt));
    const uniqueId = v4();

    // Create a new user
    const newUser = new User({
      _id: uniqueId,
      first_name: firstName,
      last_name: lastName,
      email: email,
      // role: role,
      user_name: userName,
      password: hashedPassword,
      // image: {
      //   data: data,
      // },
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    return console.error(error);
  }
};

module.exports = {
  authUser,
  register,
};
