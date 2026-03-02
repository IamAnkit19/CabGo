const express = require('express');
const router = express.Router();
const { getAllCars, addCar, updateCar, deleteCar } = require('../controllers/carController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

// Public/User: Fetch available cabs
router.get('/', getAllCars);

// Admin: Add or Edit cab details
router.post('/add', authMiddleware, adminMiddleware, upload.single('carImage'), addCar);
router.put('/edit/:id', authMiddleware, adminMiddleware, upload.single('carImage'), updateCar);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCar);

module.exports = router;