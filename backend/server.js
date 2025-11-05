const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON data in request body
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/signupDB', {
 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// API Route for Form Submission
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Send a success response
    res.status(201).json({ success: true, name: newUser.name, email: newUser.email });
console.log("Signup Response:", { name: newUser.name, email: newUser.email });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error registering user' });
  }
});




// Start the Server
const PORT = 3000; // Ensure this matches your frontend form's action URL port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
