const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allows frontend to communicate with backend

const JWT_SECRET = 'your_super_secret_key_change_this_in_production';

// --- MOCK DATABASE SETUP (Replace with your actual MongoDB URI) ---
mongoose.connect('mongodb://127.0.0.1:27017/auth_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// --- ROUTES ---

// 1. Temporary Register Route (So you have a user to log in with!)
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// 2. The Login Route (Your Assignment Task)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // A. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // B. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // C. Verify password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // D. Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // E. Return token and user data
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { email: user.email }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));