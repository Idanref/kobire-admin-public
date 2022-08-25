const express = require('express');
const router = new express.Router();
const Workshop = require('../models/workshop');
const Coupon = require('../models/coupon');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const { findOneAndUpdate } = require('../models/workshop');

// @POST - Create coupon
// @route - /coupons
// @access - Admin
router.post(
  '/coupons',
  [
    auth,
    check('couponCode', 'Coupon code is required').not().isEmpty(),
    check('expirationDate', 'Expiration date is required').not().isEmpty(),
    check('useLimit', 'Use limit is required (number of uses)').not().isEmpty().isInt({ min: 1 }),
    check('discountPercentage', 'Discount percantage is required').not().isEmpty().isInt({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const coupon = await Coupon.findOne({ couponCode: req.body.couponCode.toLowerCase() });

      if (coupon) {
        return res.status(400).send('Coupon already exists');
      }

      const newCoupon = new Coupon({
        ...req.body,
        couponCode: req.body.couponCode.toLowerCase(),
      });

      await newCoupon.save();
      return res.status(201).json(newCoupon);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('server error');
    }
  }
);

// @PUT - Edit coupon
// @route - /coupons/edit/:couponId
// @access - Admin
router.put('/coupons/edit/:couponId', auth, async (req, res) => {
  try {
    let coupon = await Coupon.findOne({ _id: req.params.couponId });

    if (!coupon) {
      return res.status(404).send('Coupon not found');
    }

    coupon = await Coupon.findOneAndUpdate({ _id: req.params.couponId }, req.body, { new: true });

    return res.json(coupon);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(500).send('Wrong Coupon Format');
    }
    console.error(err.message);
    return res.status(500).send(err);
  }
});

// @GET - Get all coupons
// @route - /coupons
// @access - Admin
router.get('/coupons', auth, async (req, res) => {
  try {
    const coupons = await Coupon.find({});

    return res.json(coupons);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err);
  }
});

// @GET - Check if coupon exists & valid
// @route - /coupons/:couponCode
// @access - Public
router.get('/coupons/:couponCode', async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ couponCode: req.params.couponCode });

    if (!coupon) {
      return res.status(404).send('Coupon not found');
    }
    return res.json(coupon);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

module.exports = router;
