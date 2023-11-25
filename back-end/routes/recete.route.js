const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage(); // Store the image data in memory as a buffer
const upload = multer({ storage });
const recite = require("../controller/recite.controller");
const { isLogin } = require("../middleware/auth.middleware");
const checkUserRecipe = require("../middleware/check_user_recipe");

// Route to add a new recipe
router.post("/add", isLogin, upload.single("image"), recite.add);

// Route to get the recipes owned by the authenticated user
router.get("/myrecipes", isLogin, recite.getMyRecipes);

// Route to update a specific recipe by ID
router.put("/update/:id", isLogin, checkUserRecipe, recite.updateRecipe);

// Route to delete a specific recipe by ID
router.delete("/:id", isLogin, checkUserRecipe, recite.deleteRecipe);

module.exports = router;
