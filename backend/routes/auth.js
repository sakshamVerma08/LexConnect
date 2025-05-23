import express from "express";
import { check } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import {
  loginController,
  logoutController,
  registerController,
  lawyerRegisterController,
  lawyerLoginController,
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

router.post("/logout", authMiddleware, logoutController);

router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// ******************************************************************
/* *******************  BELOW ARE LAWYER AUTHENTICATION ROUTES *************/
// *******************************************************************
// route is /api/auth/lawyer-register

router.post(
  "/lawyer-register",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").notEmpty().withMessage("Email is required"),
    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 5 })
      .withMessage("Password should be atleast 5 characters long"),

    check("specialization")
      .notEmpty()
      .withMessage("Mention your specialization"),
    check("experience")
      .notEmpty()
      .withMessage("Please mention your years of experience"),

    check("proBono")
      .notEmpty()
      .withMessage(
        "Please mention whether you will/will not take pro bono cases"
      ),
    check("availability")
      .notEmpty()
      .withMessage("Please mention your availability status"),

    check("rating").notEmpty().withMessage("Please mention rating as well"),
  ],
  lawyerRegisterController
);

// route is /api/auth/lawyer-login
router.post(
  "/lawyer-login",
  [
    check("email").notEmpty().withMessage("Email is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  lawyerLoginController
);

// route is /api/auth/login

// route is /api/auth/logout

// route is  api/auth/user
// @access  Private

export default router;
