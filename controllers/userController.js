// const express = require("express");
// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
// const { ACCESS_TOKEN } = require("../config");
const bcrypt = require("bcrypt");
const genToken = require("../authenticate/genToken");
const User = require("../models/userModel");

// Define all APIs 

// Create/Register a new User
const registerUser = async (req, res, next ) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
  
      try{
      // Save the new user to the MongoDB collection
      const newUser = await user.save();

      // generate the token and sign that new user
      const token = genToken(user._id); 

      //send the token to the frontend using cookies
      res.cookie("Token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: true,
        secure: true
      });
      res.status(201).json({newUser, token});
      }catch (err) {
        // res.status(404).json({ message: err.message });
        next(err);
      }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User Not Found." });
    }
    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // Check if the user's password matches the one in the database
    if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
    }
    // Return a success message if the user is found and the password matches
    return res.status(200).json({ message: "Logged in successfully !!!" });
};

// Get user information
const getUser = async (req, res) => {
    try {
      // Get user's info from the MongoDB collection
      const user = await User.findById(req.user._id);
      if (user) {
      res.status(200).json(
        {
            __id: user._id,
            username: user.username,
            email: user.email
        }
      );
      }else{
        res.status(400).json({ message: "user not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

// Get a user by ID
const getUserById =  async (req, res) => {
    try {
      // Find a user by ID from the MongoDB collection
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getUser,
    getUserById,
    registerUser,
    loginUser,
};
  