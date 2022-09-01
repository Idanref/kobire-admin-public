const express = require('express');
const router = new express.Router();
const Workshop = require('../models/workshop');
const Coupon = require('../models/coupon');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const { confirmationEmail, sendReceipt } = require('../emails/emails');

// ========== ADMIN MODE ==========

// @POST - Create new workshop (date field is: 'YYYY-MM-DD')
// @route - /workshops
// @access - Admin
router.post('/workshops', [auth, check('location', 'Location is required').not().isEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const workshop = new Workshop({
    ...req.body,
    location: req.body.location.toLowerCase(),
  });

  try {
    await workshop.save();
    return res.status(201).send(workshop);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @PUT - Update workshop
// @route - /workshops/update/:workshopId
// @access - Admin
router.put('/workshops/update/:workshopId', auth, async (req, res) => {
  try {
    // returns workshop before updated
    let workshop = await Workshop.findOneAndUpdate({ _id: req.params.workshopId }, req.body);

    if (!workshop) {
      return res.status(404).send('Workshop not found');
    }

    // workshop after updated
    workshop = await Workshop.findOne({ _id: req.params.workshopId });
    return res.json(workshop);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(500).send('Wrong Workshop Format');
    }
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @PUT - Approve user (move from 'pending' array to 'participants' array)
// Approves only if user is verified
// @route - /workshops/approve/:workshopId/:pendingId
// @access - Admin
router.put('/workshops/approve/:workshopId/:pendingId', auth, async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.workshopId).populate({
      path: 'pending',
      populate: { path: 'coupon', model: 'Coupon' },
    });

    if (!workshop) {
      return res.status(404).send('Workshop not found');
    }
    const user = workshop.pending.find((item) => item._id.toString() === req.params.pendingId);

    if (!user) {
      return res.status(404).send('Participant does not exist');
    }

    if (!user.verified) {
      return res.status(500).send('Participant is not verified');
    }

    const removeIndex = workshop.pending.map((item) => item._id.toString()).indexOf(req.params.pendingId);

    // remove user from 'pending' array
    workshop.pending.splice(removeIndex, 1);

    const userToSend = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      numOfTickets: user.numOfTickets,
      coupon: user.coupon ? user.coupon : null,
    };

    // add the user to participants array
    workshop.participants.push(userToSend);
    // increase takenSpots with the user's numOfTickets
    workshop.takenSpots += user.numOfTickets;

    // if maxSpots is not null, check if reached, if yes - mark workshop as sold out
    if (workshop.maxSpots && workshop.takenSpots >= workshop.maxSpots) {
      workshop.soldOut = true;
    }

    await workshop.save();

    const updatedWorkshop = await Workshop.findById(req.params.workshopId)
      .populate({
        path: 'pending',
        populate: { path: 'coupon', model: 'Coupon' },
      })
      .populate({
        path: 'participants',
        populate: { path: 'coupon', model: 'Coupon' },
      });

    // Email: Receipt Data
    const price = user.coupon ? ((100 - user.coupon.discountPercentage) / 100) * (user.numOfTickets * workshop.price) : user.numOfTickets * workshop.price;

    const date = `${workshop.date.getUTCDate()}/${workshop.date.getUTCMonth() + 1}/${workshop.date.getUTCFullYear()}`;

    const time = `${workshop.date.getUTCHours()}:${workshop.date.getUTCMinutes()}`;

    sendReceipt(user.name, user.email, user.phone, user.numOfTickets, price, workshop.location, date, time);

    return res.json(updatedWorkshop);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(500).send('Wrong Workshop Format');
    }
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @DELETE - Remove specific participant from specific workshop (in case of cancellation)
// Note: Participant will be moved to 'cancelled' array
// Note: takenSpots updates depending on the numOfTickets the client held
// @route - /workshops
// @access - Admin
router.delete('/workshops/:workshopId/:participantId', auth, async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.workshopId);
    if (!workshop) {
      return res.status(404).send('Workshop not found');
    }
    const participant = workshop.participants.find((participant) => participant._id.toString() === req.params.participantId);

    if (!participant) {
      return res.status(404).send('Participant does not exist');
    }

    const removeIndex = workshop.participants.map((participant) => participant._id.toString()).indexOf(req.params.participantId);

    // Update takenSpots and remove participant from array
    workshop.takenSpots -= participant.numOfTickets;
    workshop.participants.splice(removeIndex, 1);

    workshop.cancelled.push(participant);

    await workshop.save();

    return res.json(workshop);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(500).send('Wrong Workshop Format');
    }
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @PUT - Toggle Soldout State
// @route - /workshops/soldout/:id
// @access - Admin
router.put('/workshops/soldout/:id', auth, async (req, res) => {
  try {
    let workshop = await Workshop.findOne({ _id: req.params.id });
    if (workshop) {
      const soldOut = workshop.soldOut;
      workshop = await Workshop.findOneAndUpdate({ _id: req.params.id }, { $set: { soldOut: !soldOut } }, { new: true });
      return res.json(workshop);
    }
    return res.status(404).send('Workshop not found');
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(500).send('Wrong Workshop Format');
    }
    console.error(err.message);
    return res.status(500).send(err);
  }
});

// ========== PUBLIC ROUTES ==========

// @GET - Get workshops by location (param=null -> fetch all workshops)
// NOTE(!) - Will only return workshops with date >= now
// @route - /workshops?location="Tel Aviv"
// @access - Public
router.get('/workshops', async (req, res) => {
  try {
    // If location not specified in URL
    if (!req.query.location) {
      const workshop = await Workshop.find({});
      return res.json(workshop);
    }
    // Else - location not specified in URL
    const workshop = await Workshop.find({ location: req.query.location.toLowerCase(), date: { $gte: new Date() } });
    return res.json(workshop);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @GET - Get workshop by ID
// @route - /workshops/:workshopId
// @access - Public
router.get('/workshops/:workshopId', async (req, res) => {
  try {
    const workshop = await Workshop.findOne({ _id: req.params.workshopId })
      .populate({
        path: 'pending',
        populate: { path: 'coupon', model: 'Coupon' },
      })
      .populate({
        path: 'participants',
        populate: { path: 'coupon', model: 'Coupon' },
      });

    if (!workshop) {
      return res.status(404).send('Workshop not found');
    }

    return res.json(workshop);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @GET - Get workshops locations
// @route - /workshops/locations/all
// @access - Public
router.get('/workshops/locations/all', async (req, res) => {
  try {
    const locations = await Workshop.distinct('location');

    return res.json(locations);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// ========== DANGER ZONE ==========

// NOTE: Routes below are note used in production

// @DELETE - Delete all participant from specific workshop
// @route - /workshops/participants/:id
// @access - Admin
router.delete('/workshops/participants/:workshopId', auth, async (req, res) => {
  try {
    let workshop = await Workshop.findOne({ _id: req.params.workshopId });
    if (workshop) {
      workshop = await Workshop.findOneAndUpdate(
        { _id: req.params.workshopId },
        {
          $set: {
            participants: [],
            soldOut: false,
            takenSpots: 0,
          },
        },
        { new: true }
      );
      return res.json(workshop);
    }
    return res.status(404).send('Workshop not found');
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(500).send('Wrong Workshop Format');
    }
    console.error(err.message);
    return res.status(500).send(err);
  }
});

// @DELETE - Delete Specific Workshop
// @route - /workshops/:id
// @access - Admin
router.delete('/workshops/:id', auth, async (req, res) => {
  try {
    const workshop = await Workshop.findOneAndDelete({ _id: req.params.id });
    if (!workshop) {
      return res.status(404).send('Workshop Not Found');
    }
    return res.json(workshop);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(500).send('Wrong Workshop Format');
    }
    console.error(err.message);
    return res.status(500).send(err);
  }
});

// ========== TEST ROUTES ==========

// @GET - Delete Specific Workshop
// @route - /testroutes/email/confirmation
// @access - Admin
router.get('/testroutes/email/confirmation', async (req, res) => {
  try {
    const user = {
      name: 'עידן רפאלי',
      email: 'idanref@gmail.com',
      phone: '1234567890',
      numOfTickets: 3,
    };

    const workshop = {
      location: 'תל אביב',
    };

    const price = 600;
    const date = '12/10/2023';
    const time = '10:30';

    sendReceipt(user.name, user.email, user.phone, user.numOfTickets, price, workshop.location, date, time);

    return res.status(200).send('Confirmation Email Message Sent!');
  } catch (err) {
    return res.status(500).send('Server Error!');
  }
});

module.exports = router;
