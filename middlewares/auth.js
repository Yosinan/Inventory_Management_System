const { ACCESS_TOKEN } = require("../config");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


// Autherizing the user
const authorization = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, login first." });
    }

    // Verify the token
    jwt.verify(token, ACCESS_TOKEN, (err, user) => {
    if (err) {
        return res.status(403).json({ message: "Forbidden" });
    }

    // user  = await user.findById(ver.id).select("-password");
    // if (!user) {
    //     res.status(401).json({ message: "User not found" });
    // }

    // Set the user
    req.user = user;
    next();
    });
};

module.exports = authorization;