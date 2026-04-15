const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const User = require('../models/User');
const { sendOrderConfirmationEmail, sendOrderStatusEmail } = require('../utils/mailer');

const router = express.Router();

const getKolkataDateString = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
};

const parseKolkataDate = (dateString) => new Date(`${dateString}T00:00:00+05:30`);

// @POST /api/orders — Create a new order
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit phone required'),
  body('address').trim().notEmpty().withMessage('Address is required').isLength({ max: 500 }),
  body('service').isIn(['Wash & Fold', 'Wash & Iron', 'Dry Cleaning', 'Steam Iron']).withMessage('Invalid service'),
  body('pickupDate')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Valid pickup date required')
    .custom((value) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return true;
      if (value < getKolkataDateString()) {
        throw new Error('Pickup date cannot be in the past');
      }
      return true;
    }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, phone, email, address, service, pickupDate } = req.body;

    const order = new Order({
      name,
      phone,
      email: email || null,
      address,
      service,
      pickupDate: parseKolkataDate(pickupDate),
      timeline: [{ status: 'Order Placed', description: 'Your order has been confirmed' }],
      estimatedDelivery: new Date(parseKolkataDate(pickupDate).getTime() + 2 * 24 * 60 * 60 * 1000), // +2 days
    });

    await order.save();

    // Find email: from form, or from registered user by phone
    let emailTo = email;
    if (!emailTo) {
      const registeredUser = await User.findOne({ phone });
      if (registeredUser) emailTo = registeredUser.email;
    }
    if (emailTo) {
      sendOrderConfirmationEmail(emailTo, order).catch(() => {});
    }

    res.status(201).json({
      success: true,
      message: 'Order booked successfully!',
      data: {
        orderId: order.orderId,
        name: order.name,
        service: order.service,
        pickupDate: order.pickupDate,
        estimatedDelivery: order.estimatedDelivery,
        status: order.status,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// @GET /api/orders — Get all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// @PUT /api/orders/:id/status — Update order status (admin)
router.put('/:id/status', [
  body('status').isIn(['Order Placed', 'Picked Up', 'Cleaning in Progress', 'Out for Delivery', 'Delivered']).withMessage('Invalid status'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    order.status = req.body.status;
    order.timeline.push({ status: req.body.status, description: `Status updated to ${req.body.status}` });
    await order.save();

    // Send status update email
    let emailTo = order.email;
    if (!emailTo) {
      const registeredUser = await User.findOne({ phone: order.phone });
      if (registeredUser) emailTo = registeredUser.email;
    }
    if (emailTo) {
      sendOrderStatusEmail(emailTo, order).catch(() => {});
    }

    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// @GET /api/orders/track/:orderId — Track an order
router.get('/track/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId.trim() });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found. Please check your Order ID.' });
    }

    res.json({
      success: true,
      data: {
        orderId: order.orderId,
        name: order.name,
        service: order.service,
        status: order.status,
        pickupDate: order.pickupDate,
        estimatedDelivery: order.estimatedDelivery,
        timeline: order.timeline,
        createdAt: order.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
