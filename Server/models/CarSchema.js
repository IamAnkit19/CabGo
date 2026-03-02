const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    drivername: String,
    carImage: String,
    carname: String,
    cartype: String,
    price:String,
    carno: {
        type: String
    },
    status: { type: String, default: 'available', enum: ['available', 'busy', 'offline'] },
    currentLocation: {
        lat: { type: Number, default: 22.7196 }, // Default Indore Lat
        lng: { type: Number, default: 75.8577 }  // Default Indore Lng
    }
    // carImage: {
    // // data: Buffer, // Store image data as a Buffer
    // Type: String, // Store the content type (e.g., image/jpeg, image/png)
    //},
})

const Car = mongoose.model('Car', carSchema);
module.exports = Car;