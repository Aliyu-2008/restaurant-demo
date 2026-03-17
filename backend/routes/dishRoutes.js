const express = require('express');
const router = express.Router();
const db = require('../models/Dish');

// Create a dish
router.post('/', (req, res) => {
  try {
    const { name, price, description } = req.body;
    db.prepare('INSERT INTO dishes (name, price, description) VALUES (?, ?, ?)').run(name, price, description);
    res.status(201).json({ message: 'Dish added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all dishes
router.get('/', (req, res) => {
  try {
    const dishes = db.prepare('SELECT * FROM dishes').all();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;