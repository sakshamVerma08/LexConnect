import mongoose from 'mongoose';

export const lawyerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  specializations: [{
    type: String,
    required: true
  }],
  experience: {
    type: Number,
    required: true
  },
 
  proBono: {
    available: {
      type: Boolean,
      default: false
    },
    
  },
  
  rating: {
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
