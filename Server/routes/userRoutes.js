const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Public routes for Authentication
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route for User Dashboard/Edit
router.get('/profile/:id', authMiddleware, getUserProfile);
router.put('/update/:id', authMiddleware, updateUserProfile);

module.exports = router;