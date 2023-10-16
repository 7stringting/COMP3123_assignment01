const express = require("express");
const userModel = require('../models/user'); // Import your user model
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const routes = express.Router();

// Get All Users
routes.get("/users", async (req, res) => {
    try {
        const userList = await userModel.find();
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Add a New User
routes.post("/users/signup", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        // Check if the user already exists (you can implement this logic)
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new userModel({
            username,
            password: hashedPassword,
            email,
        });
        // Save the user data to the database
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update an Existing User by ID
routes.put("/users/:userid", async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.userid, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete User By ID
routes.delete("/users/:userid", async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.userid);
        if (!user) {
            res.status(200).json({ message: "User not found" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get User By ID
routes.get("/users/:userid", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userid);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get All Users in Sorted Order
routes.get("/users/sort", (req, res) => {
    res.send({ message: "Get All Users in sorted order" });
});

module.exports = routes;
