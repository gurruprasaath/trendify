import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Update User
router.put("/update/:id", updateUser);

// Delete User
router.delete("/delete/:id", deleteUser);

export default router;
