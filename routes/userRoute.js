const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {  getUser, getUserById, registerUser, loginUser, logoutUser } = require("../controllers/userController");

// using the APIs
router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);
router.get("/api/users/profile", auth , getUser);
router.get("/api/users/:id", getUserById );
router.get("/api/users/logout", logoutUser);

module.exports = router;
