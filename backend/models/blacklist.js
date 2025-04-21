import mongoose from "mongoose";

export const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },

  expiresAt: {
    type: Date,
    default: 24 * 60 * 60 * 1000,
  },

  blacklistedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Blacklist", blacklistSchema);
