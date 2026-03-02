const express = require('express');
const router = express.Router();
const { loginDriver, getDriverBookings } = require('../controllers/driverController');
const { authMiddleware, driverMiddleware } = require('../middlewares/authMiddleware');

// Driver auth
router.post('/login', loginDriver);

// Driver bookings for assigned car
router.get('/bookings', authMiddleware, driverMiddleware, getDriverBookings);

module.exports = router;

