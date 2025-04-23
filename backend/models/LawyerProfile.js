import mongoose from "mongoose";

export const lawyerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  
  specializations: [
    {
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
  ],
  experience: {
    type: Number,
    required: true,
  },

  proBono: {
    available: {
      type: Boolean,
      default: false,
    },
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    default: "",
  },

  bio: {
    type: String,
    default: "",
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
