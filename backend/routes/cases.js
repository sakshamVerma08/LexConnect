import express from "express";
import auth from "../middleware/authMiddleware.js";
import Case from "../models/Case.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createClientCase,
  getClientCases,
} from "../controllers/cases-controller.js";
const router = express.Router();

// Create a case for the logged in client
router.post("/:clientId/create-case", authMiddleware, createClientCase);

// Get all cases for a particular client

router.get("/:clientId/cases", authMiddleware, getClientCases);

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
