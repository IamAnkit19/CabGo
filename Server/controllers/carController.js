const Car = require('../models/CarSchema');

// Fetch all cars for the 'Cabs' component
exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new cab to the system
exports.addCar = async (req, res) => {
    try {
        const carData = {
            ...req.body,
            carImage: req.file ? req.file.filename : null // Save filename if uploaded
        };
        const car = await Car.create(carData);
        res.status(201).json({ success: true, car });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update specific cab details via Acabedit
exports.updateCar = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.carImage = req.file.filename; // Update image only if a new one is uploaded
        }

        const updatedCar = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedCar);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a cab
exports.deleteCar = async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: "Car deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};