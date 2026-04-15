const express = require('express');
const { body, validationResult } = require('express-validator');
const FranchiseInquiry = require('../models/FranchiseInquiry');

const router = express.Router();

// @GET /api/franchise — Get all franchise inquiries (admin)
router.get('/', async (req, res) => {
  try {
    const inquiries = await FranchiseInquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// @POST /api/franchise — Submit franchise inquiry
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit phone required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('city').trim().notEmpty().withMessage('City is required').isLength({ max: 100 }),
  body('investment').optional().trim().isLength({ max: 100 }),
  body('message').optional().trim().isLength({ max: 1000 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, phone, email, city, investment, message } = req.body;

    const inquiry = new FranchiseInquiry({ name, phone, email, city, investment, message });
    await inquiry.save();

    res.status(201).json({
      success: true,
      message: 'Franchise inquiry submitted successfully!',
      data: { name: inquiry.name, phone: inquiry.phone },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
