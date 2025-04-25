import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["proBono", "paid"],
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "assigned", "inProgress", "completed", "closed"],
    default: "open",
  },
  budget: {
    type: Number,
  },
  documents: [
    {
      name: String,
      url: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Case", caseSchema);
