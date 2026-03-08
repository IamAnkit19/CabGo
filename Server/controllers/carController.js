const Car = require('../models/CarSchema');
const supabase = require('../db/supabase');// Fetch all cars for the 'Cabs' component
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
            const file = req.file;
            filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
            
            // Upload to Supabase bucket 'cars'
            const { data, error } = await supabase.storage
                .from('cars')
                .upload(filename, file.buffer, {
                    contentType: file.mimetype,
                });

            if (error) {
                console.error("Supabase Upload Error:", error);
                throw new Error("Failed to upload image to Supabase.");
            }

            // Get public URL
            const { data: publicUrlData } = supabase.storage
                .from('cars')
                .getPublicUrl(filename);
                
            imageUrl = publicUrlData.publicUrl;
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
            const file = req.file;
            const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
            
            // Upload to Supabase bucket 'cars'
            const { data, error } = await supabase.storage
                .from('cars')
                .upload(filename, file.buffer, {
                    contentType: file.mimetype,
                });

            if (error) {
                console.error("Supabase Upload Error:", error);
                throw new Error("Failed to upload image to Supabase.");
            }

            // Get public URL
            const { data: publicUrlData } = supabase.storage
                .from('cars')
                .getPublicUrl(filename);
                
            updateData.carImage = filename;
            updateData.carImageUrl = publicUrlData.publicUrl;
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