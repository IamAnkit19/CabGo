const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    carno: { type: String, required: true }, // vehicle assigned to this driver
});

const Driver = mongoose.model('Driver', DriverSchema);
module.exports = Driver;

