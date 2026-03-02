const Mybookings = require('../models/MyBookingSchema');
const User = require('../models/UserSchema');

// Core logic to book a ride
exports.createBooking = async (req, res) => {
    try {
        const bookingData = {
            ...req.body,
            userId: req.user.id,
            bookeddate: new Date().toLocaleDateString('hi-IN')
        };
        const booking = await Mybookings.create(bookingData);

        // Reward points based on distance (1 point per km, minimum 5)
        const distanceKm = Number(booking.distanceKm) || 0;
        const rewardPoints = Math.max(5, Math.round(distanceKm));
        await User.findByIdAndUpdate(req.user.id, { $inc: { points: rewardPoints } });

        res.status(201).json({ success: true, booking });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Fetch bookings for the logged-in user dashboard
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Mybookings.find({ userId: req.params.userId });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};