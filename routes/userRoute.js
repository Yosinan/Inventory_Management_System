const express = require('express');
const router = express.Router();
const User = require("../models/userModel");

// Define the routes for the API

  // Get a list of all users
router.get('/api/users', async (req, res) => {
    try {
      // Get all users from the MongoDB collection
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});


// Create a new user
router.post('/api/users', async (req, res, next ) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
  
      try{
      // Save the new user to the MongoDB collection
      const newUser = await user.save();
      res.status(201).json(newUser);
      }catch (err) {
        // res.status(404).json({ message: err.message });
        next(err);
      }
    
});
  

// Get a user by ID
router.get('/api/users/:id', async (req, res) => {
    try {
      // Find a user by ID from the MongoDB collection
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  
module.exports = router;
  