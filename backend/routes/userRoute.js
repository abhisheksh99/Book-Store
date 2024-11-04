// Import the Express framework
import express from "express";

// Import the controller functions for user operations
import { adminLogin, createUser } from "../controllers/userController.js";

// Create a new router instance
const router = express.Router();

// Define route for admin login
// POST /api/users/admin/login
router.route("/admin/login").post(adminLogin);

// Define route for creating a new user
// POST /api/users/create
router.route("/create").post(createUser);

// Export the router to be used in the main app
export default router;