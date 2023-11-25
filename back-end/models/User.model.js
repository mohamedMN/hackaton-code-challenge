const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const users = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    user_name: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    last_login: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    createdAt: "creation_date", // Use `creation_date` to store the created date
    updatedAt: "last_update", // and `last_update` to store the last updated date
  }
);
const User = mongoose.model("User", users);
module.exports = User;
