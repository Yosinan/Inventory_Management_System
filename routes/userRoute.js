const express = require("express");
const router = express.Router();
const {  getUser, getUserById, registerUser, loginUser } = require("../controllers/userController");

// using the APIs
router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);
router.get("/api/users", getUser);
router.get("/api/users/:id", getUserById );

module.exports = router;
