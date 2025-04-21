import express from "express";
import auth from "../middleware/authMiddleware.js";
import LawyerProfile from "../models/LawyerProfile.js";
import User from "../models/User.js";

const router = express.Router();

// @route   POST api/lawyers/profile
// @desc    Create or update lawyer profile
// @access  Private
router.post("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "lawyer") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const {
      barId,
      specializations,
      experience,
      education,
      proBono,
      hourlyRate,
      location,
      bio,
      languages,
    } = req.body;

    const profileFields = {
      user: req.user.id,
      barId,
      specializations,
      experience,
      education,
      proBono,
      hourlyRate,
      location,
      bio,
      languages,
    };

    let profile = await LawyerProfile.findOne({ user: req.user.id });

    if (profile) {
      profile = await LawyerProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
    } else {
      profile = new LawyerProfile(profileFields);
      await profile.save();
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/lawyers
// @desc    Get all lawyers
// @access  Public
router.get("/", async (req, res) => {
  try {
    const lawyers = await LawyerProfile.find()
      .populate("user", ["name", "email"])
      .sort({ rating: -1 });
    res.json(lawyers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

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
router.put("/rating/:id", auth, async (req, res) => {
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
