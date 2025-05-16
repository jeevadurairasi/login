const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add a new user
router.post('/', async (req, res) => {
  const { username, email, phone } = req.body;

  try {
    const user = new User({ username, email, phone });
    await user.save();
    res.json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;