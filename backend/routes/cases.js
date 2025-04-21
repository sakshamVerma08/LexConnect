import express from "express";
import auth from "../middleware/authMiddleware.js";
import Case from "../models/Case.js";
import User from "../models/User.js";

const router = express.Router();

// @route   POST api/cases
// @desc    Create a new case
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "client") {
      return res.status(403).json({ message: "Only clients can create cases" });
    }

    const { title, description, category, type, budget } = req.body;

    const newCase = new Case({
      client: req.user.id,
      title,
      description,
      category,
      type,
      budget: type === "paid" ? budget : 0,
    });

    const case_ = await newCase.save();
    res.json(case_);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/cases
// @desc    Get all cases
// @access  Public
router.get("/", async (req, res) => {
  try {
    const cases = await Case.find()
      .populate("client", ["name"])
      .populate("lawyer", ["name"])
      .sort({ createdAt: -1 });
    res.json(cases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/cases/:id
// @desc    Get case by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const case_ = await Case.findById(req.params.id)
      .populate("client", ["name"])
      .populate("lawyer", ["name"]);

    if (!case_) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.json(case_);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Case not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/cases/:id/assign
// @desc    Assign a lawyer to a case
// @access  Private
router.put("/:id/assign", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "lawyer") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const case_ = await Case.findById(req.params.id);
    if (!case_) {
      return res.status(404).json({ message: "Case not found" });
    }

    if (case_.lawyer) {
      return res.status(400).json({ message: "Case already assigned" });
    }

    case_.lawyer = req.user.id;
    case_.status = "assigned";
    await case_.save();

    res.json(case_);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/cases/:id/status
// @desc    Update case status
// @access  Private
router.put("/:id/status", auth, async (req, res) => {
  try {
    const case_ = await Case.findById(req.params.id);
    if (!case_) {
      return res.status(404).json({ message: "Case not found" });
    }

    if (
      case_.lawyer.toString() !== req.user.id &&
      case_.client.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { status } = req.body;
    case_.status = status;
    case_.updatedAt = Date.now();

    await case_.save();
    res.json(case_);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
