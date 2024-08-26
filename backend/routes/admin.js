const express = require('express');
const Button = require('../models/Button');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to authenticate admin
const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    // Here you can add further checks if the user is an admin
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

// Add Button (Admin Only)
router.post('/buttons', authenticateAdmin, async (req, res) => {
  try {
    const { title, link } = req.body;
    const button = new Button({ title, link });
    await button.save();
    res.status(201).send('Button added');
  } catch (error) {
    res.status(400).send('Error adding button');
  }
});

module.exports = router;
