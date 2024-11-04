import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

export const createOrder = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        phone,
        address,
        city,
        country,
        state,
        zipcode,
        totalPrice,
        items
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !address || !city || !country || !state || !zipcode || !totalPrice || !items || items.length === 0) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Create new order
    const newOrder = new Order({
        name,
        email,
        phone,
        address,
        city,
        country,
        state,
        zipcode,
        totalPrice,
        items
    });

    try {
        // Save the order
        const savedOrder = await newOrder.save();

        res.status(201).json({
            message: "Order created successfully",
            order: savedOrder
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create order",
            error: error.message
        });
    }
});