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
      "Corporate Law",
      "Environment Law",
      "Intellectual property law",
      "Tax Law",
      "Labor Law",
      "Familly Law",
    ],
  },

  experience: {
    type: Number,
    required: true,
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

/*
export const lawyerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  specializations: {
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

  proBono: {
    type: Boolean,
    default: true,
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  location: {
    type: String,
    required: true,
    default: "Not mentioned",
  },

  bio: {
    type: String,
    default: "No bio available",
  },

  languages: {
    type: String,
    default: "English",
    enum: ["English", "Spanish", "French", "German", "Chinese", "Arabic"],
  },

  availability: {
    type: Boolean,
    default: true,
  },
});


export default mongoose.model("LawyerProfile", lawyerProfileSchema);
*/

export default mongoose.model("Lawyer", lawyerSchema);
