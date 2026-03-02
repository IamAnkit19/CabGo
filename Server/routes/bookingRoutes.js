const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/bookingController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// User: Book a cab
router.post('/book', authMiddleware, createBooking);

// User: View personal ride history
router.get('/my/:userId', authMiddleware, getUserBookings);

module.exports = router;