const mongoose = require('mongoose');
const rideSchema = new mongoose.Schema({
    selectedPickupState: String,
    selectedPickupCity: String,
    selectedDropState: String,
    selectedDropCity: String,
    pickupAddress: String,
    dropAddress: String,
    pickupLat: Number,
    pickupLng: Number,
    dropLat: Number,
    dropLng: Number,
    distanceKm: Number,
    pickupdate: String,
    pickuptime: String,
    dropdate: String,
    droptime: String,
    drivername: String,
    fare: String,
    carname: String,
    cartype: String,
    carno: String,
    price: String,
    note: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    bookeddate: {
        type: String,
        default: () => new Date().toLocaleDateString('hi-IN')
    }
});
const Mybookings = mongoose.model('Mybookings', rideSchema);
module.exports = Mybookings;