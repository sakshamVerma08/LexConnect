import mongoose from "mongoose";

export const lawyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  specialization: {
    type: String,
    required: true,
    enum: [
      "Criminal Law",
      "Family Law",
      "Corporate Law",
      "Intellectual Property Law",
      "Tax Law",
      "Labor Law",
      "Environmental Law",
    ],
  },

  experience: {
    type: Number,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
    default: 1,
  },

  proBono: {
    type: Boolean,
    required: true,
    default: true,
  },

  availability: {
    type: Boolean,
    default: true,
    required: true,
  },

  bio: {
    type: String,
  },

  language: {
    type: String,
    default: "English",
  },

  location: { type: String, required: true },
});

export default mongoose.model("Lawyer", lawyerSchema);
