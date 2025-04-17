import mongoose from 'mongoose';

const lawyerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  barId: {
    type: String,
    required: true,
    unique: true
  },
  specializations: [{
    type: String,
    required: true
  }],
  experience: {
    type: Number,
    required: true
  },
  education: [{
    institution: String,
    degree: String,
    year: Number
  }],
  proBono: {
    available: {
      type: Boolean,
      default: false
    },
    casesPerMonth: {
      type: Number,
      default: 0
    }
  },
  hourlyRate: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  location: {
    city: String,
    state: String,
    country: String
  },
  bio: String,
  languages: [String],
  availability: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model('LawyerProfile', lawyerProfileSchema);
