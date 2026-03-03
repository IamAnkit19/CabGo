const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    drivername: String,
    // Legacy: stored filename only
    carImage: String,
    // New: full URL to the image
    carImageUrl: String,
    carname: String,
    cartype: String,
    price: String,
    carno: {
        type: String
    },
    status: { type: String, default: 'available', enum: ['available', 'busy', 'offline'] },
    currentLocation: {
        lat: { type: Number, default: 22.7196 }, // Default Indore Lat
        lng: { type: Number, default: 75.8577 }  // Default Indore Lng
    }
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;