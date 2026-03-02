const jwt = require('jsonwebtoken');

// Protects routes for logged-in users and admins
exports.authMiddleware = (req, res, next) => {
    // Standard approach: Get token from Authorization header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify token using your secret key from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user info to request object so controllers can use it
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

// Optional: Specific check for Admin-only routes
exports.adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied: Admin privileges required" });
    }
};

// Driver-only routes
exports.driverMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'driver') {
        next();
    } else {
        res.status(403).json({ message: "Access denied: Driver privileges required" });
    }
};