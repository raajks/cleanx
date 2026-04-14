const mongoose = require('mongoose');

const franchiseInquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 200,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  investment: {
    type: String,
    required: true,
    enum: ['3-5 Lakhs', '5-10 Lakhs', '10-20 Lakhs', '20+ Lakhs'],
  },
  message: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'In Discussion', 'Approved', 'Rejected'],
    default: 'New',
  },
}, { timestamps: true });

module.exports = mongoose.model('FranchiseInquiry', franchiseInquirySchema);
