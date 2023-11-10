const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./model/user.js");
const bcrypt = require("bcrypt");
const app = express(); 

const SERVER_PORT = 3001;

// const DB_CONNECTION_STRING = "mongodb://localhost:27017/comp3123_assignment1";
const DB_CONNECTION_STRING = "mongodb+srv://aaloreabi2000:Gr33ngr33n12E@cluster0.z7sm5qd.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority"

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

const userRoutes = require("./routes/users");
app.use("/api/v1", userRoutes);

const employeeRoutes = require('./routes/employees');
app.use('/api/v1/emp', employeeRoutes);

app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});
