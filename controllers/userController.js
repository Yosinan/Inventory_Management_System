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
        const { email } = req.body;
        // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    // generate the token and sign that new user
    const token = genToken(user._id); 

    user.token = token;

    //send the token to the frontend using cookies
    res.cookie("Token", token, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true
    });
      // Save the new user to the MongoDB collection
      await user.save();

     res.status(200).json({message: "User registered successfully !!!" , token: token});
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

     return res.status(201).json({ message: "Logged in successfully !!!"});
    
};

// Logout a user 
const logoutUser = async (req, res) => {
  try{
   // const token = req.cookies.token;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    // Remove the token from the database
    user.token = undefined;
    res.cookie("Token", "");
    await user.save();

    return res.status(201).json({message: "Logged out successfully"});
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
   // res.redirect("/");
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
            name: user.name,
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

const stat = (req, res) => {
    res.status(200).json({message: "ok"});
};

module.exports = {
    getUser,
    getUserById,
    registerUser,
    loginUser,
    logoutUser,
    stat,
};