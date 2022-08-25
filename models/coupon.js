const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
    trim: true,
  },
  expirationDate: {
    type: Date,
    default: Date.now,
  },
  useLimit: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
