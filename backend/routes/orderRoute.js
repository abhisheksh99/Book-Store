import express from "express";
import { createOrder, getOrderByEmail } from "../controllers/orderController.js";

// Initialize express router
const router = express.Router();

// Route for creating a new order
// POST /api/orders
router.route("/").post(createOrder);

// Route for getting orders by email
// GET /api/orders/email/:email
router.route("/email/:email").get(getOrderByEmail);

// Export the router to be used in the main app
export default router;