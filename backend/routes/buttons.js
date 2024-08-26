const express = require('express');
const Button = require('../models/Button');
const router = express.Router();

// Get All Buttons
router.get('/', async (req, res) => {
  try {
    const buttons = await Button.find();
    res.json(buttons);
  } catch (error) {
    res.status(500).send('Error fetching buttons');
  }
});

module.exports = router;
