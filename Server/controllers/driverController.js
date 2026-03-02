const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Driver = require('../models/DriverSchema');
const Mybookings = require('../models/MyBookingSchema');

// POST /api/driver/login
exports.loginDriver = async (req, res) => {
    try {
        const { email, password } = req.body;
        const driver = await Driver.findOne({ email });
        if (!driver) {
            return res.status(401).json({ message: 'Driver not found' });
        }
        const match = await bcrypt.compare(password, driver.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { id: driver._id, role: 'driver' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.json({
            success: true,
            token,
            driver: {
                id: driver._id,
                name: driver.name,
                email: driver.email,
                carno: driver.carno,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /api/driver/bookings
// Returns bookings for the driver's assigned car number
exports.getDriverBookings = async (req, res) => {
    try {
        const driver = await Driver.findById(req.user.id);
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        const bookings = await Mybookings.find({ carno: driver.carno }).sort({ _id: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

