const multer = require('multer');
const path = require('path');

// Configure how files are stored
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Points to the uploads/ folder defined in your architecture
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Renames file to: fieldname-timestamp.extension
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Validate file types (only images allowed)
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
    fileFilter: fileFilter
});

module.exports = upload;