const mongoose = require("mongoose");
// const User = require("./userModel");

// Create a Mongoose schema for products
const productSchema = new mongoose.Schema({
    name: String,
    unitPrice: Number,
    stock: Number,
    description: String,
    images: [String],
    category: String,
    addedBy: String,
});
  
  // Create a Mongoose model for products
  const Product = mongoose.model('Product', productSchema);

  module.exports = Product;