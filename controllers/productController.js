const Product = require('../models/productModel');

// Set up routes for products

// Add products
const addItem = (req, res) => {
    try {
    const product = new Product(req.body);
    product.save();
    res.status(201).send(product);
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
     const product = await Product.findById(req.params.id);
      if (product) { res.send(product); }
      else next(err); 
};
  
// DELETE a product by ID
const deleteItem = async (req, res) => {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (err) {res.send(err); }
       res.send("Product deleted");
      
      // next(err);
};

//   // Delete all products
//   router.delete('/api/products/', async (req, res) => {
//     await Product.deleteAll();
//     if (err) {res.send(err); }
//     res.send("All Products are deleted");
//   });
  
// PUT a product by ID
const editItem = async (req, res) => {
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