const User = require('../models/UserSchema');
const Admin = require('../models/AdminSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Basic password hashing
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ success: true, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ success: true, token, user });
    } else {
        res.status(401).json({ message: "Invalid Credentials" });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { name, email }, 
            { new: true }
        ).select('-password');
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};