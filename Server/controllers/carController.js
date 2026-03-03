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
        let filename = null;
        let imageUrl = null;
        if (req.file) {
            filename = req.file.filename;
            imageUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
        }

        const carData = {
            ...req.body,
            carImage: filename,
            carImageUrl: imageUrl
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
            const filename = req.file.filename;
            updateData.carImage = filename;
            updateData.carImageUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
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