const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./model/user");
const bcrypt = require("bcrypt");
const app = express(); // Create a new Express app

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

// Import and use your user routes defined in users.js
const userRoutes = require("./routes/users");
app.use("/api/v1", userRoutes);

// Start your Express app
app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});
