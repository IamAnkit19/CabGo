const express = require('express');
const router = express.Router();
const {
    adminLogin,
    getAllUsers,
    deleteUser,
    getAllBookings,
    getAllDrivers,
    createDriver,
    deleteDriver,
} = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

// Admin Authentication
router.post('/login', adminLogin);

router.get('/bookings', authMiddleware, adminMiddleware, getAllBookings);

// Admin Management of Users
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

// Admin Management of Drivers
router.get('/drivers', authMiddleware, adminMiddleware, getAllDrivers);
router.post('/drivers', authMiddleware, adminMiddleware, createDriver);
router.delete('/drivers/:id', authMiddleware, adminMiddleware, deleteDriver);

module.exports = router;