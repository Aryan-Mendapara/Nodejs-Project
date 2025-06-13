const jwt = require('jsonwebtoken');
const { Login } = require('../Models/Login');

const auth = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ error: "Please authenticate." });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // Find user by ID from decoded token
        const user = await Login.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Attach user to request for use in routes
        req.user = user;
        next();

    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        res.status(401).json({ error: "Invalid or expired token." });
    }
};

module.exports = auth;
