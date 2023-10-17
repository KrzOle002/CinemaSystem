const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  birthDate: {
    type: Date,
  },
  gender: {
    type: String,
  },
  city: {
    type: String
  },
  zipCode: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);
