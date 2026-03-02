const Admin = require('../models/AdminSchema');
const User = require('../models/UserSchema');
const Driver = require('../models/DriverSchema');
const Mybookings = require('../models/MyBookingSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin login logic
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (admin && (await bcrypt.compare(password, admin.password))) {
            const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ success: true, token });
        } else {
            res.status(401).json({ message: "Admin access denied" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch all registered users for Admin dashboard
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete user functionality
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User removed successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch all bookings for admin monitoring
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Mybookings.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Drivers management
exports.getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find().select('-password');
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createDriver = async (req, res) => {
    try {
        const { name, email, password, carno } = req.body;
        if (!name || !email || !password || !carno) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existing = await Driver.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Driver with this email already exists' });
        }
        const hashed = await bcrypt.hash(password, 10);
        const driver = await Driver.create({ name, email, password: hashed, carno });
        res.status(201).json({
            success: true,
            driver: { id: driver._id, name: driver.name, email: driver.email, carno: driver.carno },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteDriver = async (req, res) => {
    try {
        await Driver.findByIdAndDelete(req.params.id);
        res.json({ message: 'Driver removed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};