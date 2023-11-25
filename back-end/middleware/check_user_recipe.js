const Recipe = require("../models/Recite.model"); // Adjust the path accordingly

const checkUserRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    console.log("recipeId ", recipeId);
    const userId = req.session.user._id;
    // Ensure that the user is the owner of the recipe
    const recipe = await Recipe.findOne({ _id: recipeId, user_id: userId });
    if (!recipe) {
      return res.status(403).json({
        success: false,
        message: "You are not the owner of this recipe",
      });
    }

    // If the user is the owner, continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error checking user recipe:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = checkUserRecipe;
