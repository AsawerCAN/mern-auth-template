const express = require("express");
const authController = require("../controllers/authController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// Protected Route
router.get("/profile", authenticateUser, (req, res) => {
  res
    .status(200)
    .json({ message: "Profile accessed successfully", user: req.user });
});

module.exports = router;
