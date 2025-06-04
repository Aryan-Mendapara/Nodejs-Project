const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY || "adjkasd#asfsdf%^djkncj";

const protect = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = auth.split(" ")[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Now you can access req.user.id in next middleware
        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token invalid" });
    }
};

module.exports = protect;
