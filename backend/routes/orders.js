const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');

const router = express.Router();

// @POST /api/orders — Create a new order
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit phone required'),
  body('address').trim().notEmpty().withMessage('Address is required').isLength({ max: 500 }),
  body('service').isIn(['Wash & Fold', 'Wash & Iron', 'Dry Cleaning', 'Steam Iron']).withMessage('Invalid service'),
  body('pickupDate').isISO8601().withMessage('Valid date required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, phone, address, service, pickupDate } = req.body;

    const order = new Order({
      name,
      phone,
      address,
      service,
      pickupDate,
      timeline: [{ status: 'Order Placed', description: 'Your order has been confirmed' }],
      estimatedDelivery: new Date(new Date(pickupDate).getTime() + 2 * 24 * 60 * 60 * 1000), // +2 days
    });

    await order.save();

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
