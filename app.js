const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userModel = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comp3123_assignment1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.post('/api/v1/user/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if the user already exists based on username or email
    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10); // '10' is the saltRounds

    // Create a new user
    const newUser = new userModel({
      username,
      password: hashedPassword,
      email,
    });

    // Save the user data to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post('/api/v1/user/login', (req, res) => {
  // Your code for user account login goes here
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
