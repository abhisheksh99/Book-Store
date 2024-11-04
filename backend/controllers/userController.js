import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const adminLogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const admin = await User.findOne({ username });

    if (!admin || admin.role !== "Admin") {
        res.status(401);
        throw new Error("Invalid username or not an admin");
    }

    // Check if password is correct
    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
        res.status(401);
        throw new Error("Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign(
        { id: admin._id, username: admin.username, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.status(200).json({
        message: "Authentication successful",
        token: token,
        user: {
            username: admin.username,
            role: admin.role
        }
    });
});

export const createUser = asyncHandler(async (req, res) => {
    const { username, password, role } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        username,
        password,
        role
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            role: user.role
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});