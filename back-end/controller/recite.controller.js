const Recipe = require("../models/Recite.model"); // Adjust the path accordingly
const { check, validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const User = require("../models/User.model");
const { v4 } = require("uuid");
// Route to add a new recipe
const add = async (req, res) => {
  try {
    await Promise.all([
      check("name").notEmpty().withMessage("Name is required").run(req),
      check("ingredients")
        .isArray({ min: 1 }) // Ensure it's an array with at least one element
        .withMessage("Ingredients must be an array with at least one element")
        .custom((value) => {
          // Validate each ingredient object in the array
          for (const ingredient of value) {
            if (!ingredient.name || !ingredient.quantity) {
              throw new Error("Each ingredient must have a name and quantity");
            }
          }
          return true;
        })
        .run(req),
      // Validate preparationSteps
      check("preparationSteps")
        .isArray({ min: 1 }) // Ensure it's an array with at least one element
        .withMessage(
          "Preparation steps must be an array with at least one element"
        )
        .custom((value) => {
          // Validate each preparation step in the array
          for (const step of value) {
            if (!step) {
              throw new Error("Each preparation step must have a value");
            }
          }
          return true;
        })
        .run(req),
      check("preparationTime")
        .notEmpty()
        .withMessage("Preparation time is required")
        .run(req),
    ]);

    // Check for validation errors
    const errors = validationResult(req);
    if (errors) {
      return res.status(401).json({
        success: false,
        message: "Validation failed",
        errors: errors.errors,
      });
    }

    // Check if the provided user_id exists in the User database
    const userId = req.body.user_id; // Assuming the user_id is in the request body
    const user = await User.findById(userId);

    if (!user) {
      res.status(405).json({
        success: false,
        message: "You can't add a recipe without a user.",
      });
    }

    if (req.file) {
      var photo = req.file.buffer;
    } else {
      const defaultImagePath = path.join(
        __dirname,
        "../assets/images/default.jpg"
      );
      var photo = fs.readFileSync(defaultImagePath);
    }
    const { name, ingredients, preparationSteps, preparationTime } = req.body;
    const id = v4();
    // Create a new recipe
    const newRecipe = new Recipe({
      _id: id,
      name,
      ingredients,
      preparationSteps,
      preparationTime,
      user_id: userId,
      photo,
    });

    // Save the recipe to the database
    const savedRecipe = await newRecipe.save();

    res.status(201).json({
      success: true,
      message: "Recipe added successfully",
      recipe: {
        _id: savedRecipe._id,
        name: savedRecipe.name,
        ingredients: savedRecipe.ingredients,
        preparationSteps: savedRecipe.preparationSteps,
        preparationTime: savedRecipe.preparationTime,
        user_id: savedRecipe.user_id,
      },
    });
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get recipes for the authenticated user
const getMyRecipes = async (req, res) => {
  try {
    // Assuming user ID is stored in req.session.userId after authentication
    const userId = req.session.user._id;
    console.log("userId ", userId);
    // Fetch recipes for the authenticated user
    const recipes = await Recipe.find({ user_id: userId }).populate("user_id");
    // console.log("recipes ", recipes);
    // Map over each recipe to format the response
    const formattedRecipes = recipes.map((recipe) => ({
      _id: recipe._id,
      name: recipe.name,
      ingredients: recipe.ingredients,
      preparationSteps: recipe.preparationSteps,
      preparationTime: recipe.preparationTime,
      user_id: recipe.user_id,
    }));
    res.status(200).json({
      success: true,
      message: "Recipes fetched successfully",
      recipes: formattedRecipes,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// Update a recipe
const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.session.user._id;
    const recipe = await Recipe.findOne({ _id: recipeId, user_id: userId });

    // Update the recipe fields based on the request body
    recipe.name = req.body.name || recipe.name;
    recipe.ingredients = req.body.ingredients || recipe.ingredients;
    recipe.preparationSteps =
      req.body.preparationSteps || recipe.preparationSteps;
    recipe.preparationTime = req.body.preparationTime || recipe.preparationTime;

    // Save the updated recipe
    const updatedRecipe = await recipe.save();

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.session.user._id;

    // Delete the recipe
    const deleted_Recipe = await Recipe.findByIdAndDelete({
      _id: recipeId,
      user_id: userId,
    });

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
      deleted_Recipe :{
        _id: deleted_Recipe._id,
        name: deleted_Recipe.name,
        ingredients: deleted_Recipe.ingredients,
        preparationSteps: deleted_Recipe.preparationSteps,
        preparationTime: deleted_Recipe.preparationTime,
        user_id: deleted_Recipe.user_id,
      },
    });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  add,
  getMyRecipes,
  updateRecipe,
  deleteRecipe,
};
