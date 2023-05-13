const express = require("express");
const router = express.Router();
// const auth = require("../middlewares/auth");
const {  getItems, getItemById, addItem, editItem, deleteItem } = require("../controllers/productController");

// using the APIs
router.post("/api/products/add", addItem);
router.put("/api/products/edit", editItem);
router.delete("/api/products/delete", deleteItem);
router.get("/api/products/view", getItems);
router.get("/api/products/:id", getItemById);

module.exports = router;
