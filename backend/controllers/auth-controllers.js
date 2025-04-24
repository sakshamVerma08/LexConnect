import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import Blacklist from "../models/blacklist.js";
import Lawyer from "../models/Lawyer.js";
export const registerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const logoutController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }

    const blacklistedToken = await Blacklist.findOne({ token });
    if (blacklistedToken) {
      return res.status(400).json({ message: "Token already blacklisted" });
    }

    const temp = new Blacklist({
      token,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      blacklistedAt: Date.now(),
    });

    await Blacklist.create(temp);

    return res
      .status(200)
      .json({ message: "Logged out successfully", success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

// ************************
// LAWYER AUTH CONTROLLERS
// ************************

export const lawyerRegisterController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Error in validation of request body",
      errors: errors.array(),
    });
  }

  try {
    const {
      name,
      email,
      password,
      rating,
      specialization,
      experience,
      proBono,
      availability,
      location,
    } = req.body;

    const existingLawyer = await Lawyer.findOne({ email });

    if (existingLawyer) {
      return res
        .status(400)
        .json({ message: "This email already exists, please login" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!hashedPassword) {
      return res
        .status(400)
        .json({ message: "Error while generating password" });
    }

    const newLawyer = new Lawyer({
      name,
      email,
      rating,
      password: hashedPassword,
      specialization,
      experience,
      location,
      availability,
      proBono,
    });

    await newLawyer.save();

    const payload = { id: newLawyer._id, role: "lawyer" };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    if (!token) {
      return res.status(400).json({ message: "Error generating token" });
    }

    return res.status(200).json({
      data: token,
      success: true,
      message: "Lawyer Signup Successful",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  } 
};

export const lawyerLoginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Error in validation", errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const existingLawyer = await Lawyer.findOne({ email }).select("+password");
    if (!existingLawyer) {
      return res
        .status(404)
        .json({ message: "Email doesn't exist, please sign up" });
    }

    const isSame = await bcrypt.compare(password, existingLawyer.password);

    if (!isSame) {
      return res.status(400).json({ message: "Password doesn't match" });
    }

    const payload = { id: existingLawyer._id, role: "lawyer" };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res
      .status(200)
      .json({ data: token, success: true, message: "Lawyer Login successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
