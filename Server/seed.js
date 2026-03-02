const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('./models/AdminSchema');
const connectDB = require('./db/config');

dotenv.config();
connectDB();

const seedAdmin = async () => {
    try {
        // Check if admin exists
        const adminExists = await Admin.findOne({ email: "admin@example.com" });
        if (adminExists) {
            console.log("Admin already exists");
            process.exit();
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin123", salt);

        // Create Admin
        await Admin.create({
            name: "Super Admin",
            email: "admin@example.com",
            password: hashedPassword
        });

        console.log("Admin created successfully");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();