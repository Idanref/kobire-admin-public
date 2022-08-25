const express = require('express');
const router = new express.Router();
const AdminInfo = require('../models/adminInfo');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @POST - Login as admin to dashboard
// @route - /admin/login
// @access - Public
router.post('/admin/login', check('username', 'Username is required').not().isEmpty(), check('password', 'Password is required').not().isEmpty(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // else - success

  const { password } = req.body;
  const username = req.body.username.toLowerCase();

  try {
    let user = await AdminInfo.findOne({ username });

    //if user doesn't exist
    if (!user) {
      return res.status(400).send('Inavlid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send('Inavlid credentials');
    }

    // return JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Register - Used only by DB Admin (Idanref)
router.post('/admin/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = new AdminInfo({
      username: username.toLowerCase(),
      password,
    });

    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
