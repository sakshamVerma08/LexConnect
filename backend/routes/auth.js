import express from "express";
import { check } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/auth-controllers.js";

const router = express.Router();

// route is /api/auth/signup
router.post(
  "/register",
  [
    check("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long"),
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),

    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    check("role")
      .notEmpty()
      .withMessage("Role is required")
      .isIn(["client", "lawyer"])
      .withMessage("Role must be either client or lawyer"),
  ],
  registerController
);

// route is /api/auth/login
router.post(
  "/login",
  [
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),

    check("password").notEmpty().withMessage("Password is required"),
  ],
  loginController
);

// route is /api/auth/logout
router.post("/logout", authMiddleware, logoutController);

// route is  api/auth/user
// @access  Private
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
