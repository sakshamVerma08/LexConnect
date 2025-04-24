import express from "express";
import LawyerProfile from "../models/Lawyer.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getLawyerProfile } from "../controllers/lawyer-controllers.js";

const router = express.Router();


// @route   GET api/lawyers
// @desc    Get all lawyers
// @access  Public
router.get("/get-lawyers", authMiddleware, getLawyerProfile);


// @route   GET api/lawyers/profile/:id
// @desc    Get lawyer profile by ID
// @access  Public
router.get("/profile/:id", async (req, res) => {
  try {
    const profile = await LawyerProfile.findById(req.params.id).populate(
      "user",
      ["name", "email"]
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/lawyers/rating/:id
// @desc    Update lawyer rating
// @access  Private
router.put("/rating/:id", authMiddleware, async (req, res) => {
  try {
    const profile = await LawyerProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const { rating } = req.body;

    profile.rating =
      (profile.rating * profile.totalReviews + rating) /
      (profile.totalReviews + 1);
    profile.totalReviews += 1;

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
