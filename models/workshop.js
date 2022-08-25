const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  location: {
    type: String,
    required: true,
  },
  maxSpots: {
    type: Number,
  },
  takenSpots: {
    type: Number,
    default: 0,
  },
  bitUrl: {
    type: String,
    default: '',
  },
  payBoxUrl: {
    type: String,
    default: '',
  },
  soldOut: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: 200,
  },
  participants: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      numOfTickets: {
        type: Number,
        required: true,
      },
      coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
      },
    },
  ],
  pending: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      numOfTickets: {
        type: Number,
        required: true,
      },
      code: {
        type: Number,
        required: true,
      },
      verified: {
        type: Boolean,
        default: false,
      },
      coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
      },
    },
  ],
});

const Workshop = mongoose.model('Workshop', workshopSchema);

module.exports = Workshop;
