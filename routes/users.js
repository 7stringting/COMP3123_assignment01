const express = require("express");
const userModel = require('../model/user.js'); 
const bcrypt = require("bcrypt"); 
const routes = express.Router();

// Get All Users
routes.get("/user", async (req, res) => {
    try {
        const userList = await userModel.find();
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Add a New User
routes.post("/user/signup", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
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

// User Login
routes.post("/user/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find the user by username
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json(error);
    }
});





module.exports = routes;
