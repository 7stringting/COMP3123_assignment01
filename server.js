const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./model/user"); 
const bcrypt = require("bcrypt"); 

const app = express();

const SERVER_PORT = 3000;

const DB_CONNECTION_STRING = "mongodb://localhost:27017/comp3123_assignment1";

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const database = mongoose.connection;

database.on('error', (error) => {
    console.error(error);
});

database.once('open', () => {
    console.log('Database connection successful');
});

app.use(express.json());

// Define your user account routes here
// Example:
app.get("/", (req, res) => {
    res.send("Welcome to the User Account API");
});


app.post("/api/v1/user/signup", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if the user already exists based on username or email
        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "Username or email already in use" });
        }

        // Hash the password securely
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


app.post("/api/v1/user/login", (req, res) => {
    // Your code for user account login goes here
});


app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});
