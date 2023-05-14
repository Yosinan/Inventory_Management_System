const Product = require('../models/productModel');
const User = require("../models/userModel");

// Set up routes for products

// Add products (logged in users only)
const addItem = (req, res) => {
    try {
    const product = new Product(req.body);
    product.save();
    // res.status(201).send(product);
    console.log("Product added successfully");
    res.status(201).json({product});
    } catch (err) {
        res.status(500).send(err);
    }
};

// GET all products
const getItems = async (req, res) => {
    try {
    const products = await Product.find();
     res.send(products);
    } catch (err) {
    next(err);
     }
};
  
// GET a product by ID
const  getItemById = async (req, res, next) => {
  try{
     const product = await Product.findById(req.params.id);
      if (product) { res.send(product); }
  } catch (err) {
       next(err); 
}
};
  
// DELETE a product by ID (logged in users only)
const deleteItem = async (req, res, next) => {
  try{
      const product = await Product.findByIdAndDelete(req.params.id);
      if (product) { res.send("Product Deleted"); 
      res.status(404).send("Product not found");
    }
  } catch (err) {
       next(err);
  }
};

// EDIT a product by ID (logged in users only)
const editItem = async (req, res, next) => {
    try {
     const product = await Product.findByIdAndUpdate(req.params.id, req.body);
      res.send(product);
    } catch (err) {
      if (err) {
         next(err);
        } else if (!product) {
          res.status(404).send('Product not found');
        } 
      }
};


module.exports = {
    getItems, 
    getItemById, 
    deleteItem,
    addItem, 
    editItem, 
}