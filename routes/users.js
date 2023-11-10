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
routes.post("/user/signup", async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        
        // Here you might want to add additional validation for the input

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            username,
            password: hashedPassword,
            email,
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
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

        //Password comparision
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json(error);
    }
});

// Error handling middleware
routes.use((error, req, res, next) => {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Invalid request data' });
    } else if (error.name === 'MongoError' && error.code === 11000) {
      res.status(409).json({ message: 'User already exists' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = routes;
