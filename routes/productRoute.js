const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {  getItems, getItemById, addItem, editItem, deleteItem } = require("../controllers/productController");

// using the APIs
router.post("/api/products/add", auth, addItem);
router.put("/api/products/edit/:id", auth, editItem);
router.delete("/api/products/delete/:id", auth, deleteItem);
router.get("/api/products/view", getItems);
router.get("/api/products/:id", getItemById);

module.exports = router;
