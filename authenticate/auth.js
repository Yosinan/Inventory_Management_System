const { ACCESS_TOKEN } = require("../config");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


// Authenticate the user
const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token
    jwt.verify(token, ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }

        // Set the user
        req.user = user;
        next();
    });
};

module.exports = authenticate;