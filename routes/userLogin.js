const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// login route
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // Check if the user's password matches the one in the database
    if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
    }

    // Return a success message if the user is found and the password matches
    res.send(`Welcome Back, ${user.name} :)`).json({ message: "Login successful" });
});

module.exports = router
