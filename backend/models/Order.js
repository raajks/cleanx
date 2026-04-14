const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
  },
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
  address: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  service: {
    type: String,
    required: true,
    enum: ['Wash & Fold', 'Wash & Iron', 'Dry Cleaning', 'Steam Iron'],
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Order Placed', 'Picked Up', 'Cleaning in Progress', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Order Placed',
  },
  timeline: [{
    status: String,
    description: String,
    time: { type: Date, default: Date.now },
  }],
  estimatedDelivery: Date,
}, { timestamps: true });

// Auto-generate orderId before saving
orderSchema.pre('save', async function (next) {
  if (!this.orderId) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Order').countDocuments();
    this.orderId = `RJC-${year}-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
