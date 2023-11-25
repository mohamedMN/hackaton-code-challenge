const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true },
    },
  ],
  preparationSteps: [
    {
      type: String,
      required: true,
    },
  ],
  preparationTime: {
    type: String,
    required: true,
    default: null,
  },
  // Reference to the User table
  user_id: {
    type: String,
    ref: "User", // Assuming your User model is named 'User'
    required: true,
  },
  // Champ pour stocker l'URL de la photo
  photo: {
    type: String,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
