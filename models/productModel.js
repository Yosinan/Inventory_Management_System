const mongoose = require("mongoose");

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
  
productSchema.set("toJSON",
{
  transform: (_, obj) => {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;

  },
})

  // Create a Mongoose model for products
  const Product = mongoose.model('Product', productSchema);

  module.exports = Product;