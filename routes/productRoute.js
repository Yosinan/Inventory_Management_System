const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// Set up routes for products
// GET all products
router.get('/api/products', async (req, res) => {
    try {
      const products = await Product.find();
     res.send(products);
    } catch (err) {
    res.status(500).send(err);
     }
    });
  
  // POST a new product
router.post('/api/products', (req, res) => {
      try {
      const product = new Product(req.body);
      product.save();
      res.status(201).send(product);
      } catch (err) {
          res.status(500).send(err);
      }
    });
  
  // GET a product by ID
router.get('/api/products/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.send(product);
    } catch (err) {
      if (err) {
      res.status(500).send(err);
      } else if (!product) {
        res.status(404).send('Product not found');
        } 
      }
  });
  
  
  // DELETE a product by ID
router.delete('/api/products/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      res.send(product);
    } catch (err) {
      if (err) {
       res.status(500).send(err);
      }
      else if (!product) {
          res.status(404).send('Product not found');
        }
      }
  });
  
  // PUT a product by ID
router.put('/api/products/:id', async (req, res) => {
    try {
     const product = await Product.findByIdAndUpdate(req.params.id, req.body);
      res.send(product);
    } catch (err) {
      if (err) {
          res.status(500).send(err);
        } else if (!product) {
          res.status(404).send('Product not found');
        } 
      }
  });

module.exports = router;
