const express = require('express');
const router = express.Router();
const db = require('../models/Dish');

// Get all dishes
router.get('/', (req, res) => {
  try {
    const dishes = db.prepare('SELECT * FROM dishes').all();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a dish
router.post('/add', (req, res) => {
  try {
    const { name, price, description } = req.body;
    db.prepare('INSERT INTO dishes (name, price, description) VALUES (?, ?, ?)').run(name, price, description);
    res.status(201).json({ message: 'Dish added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a dishe
router.put('/Update/:id', (req, res) => {
  try {
    const dishes = db.prepare('UPDATE FROM dishes WHERE id ? ').all();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a dishe
router.delete('/Delete/:id', (req, res) => {
  try {
    const dishes = db.prepare('DELETE FROM dishes WHERE id ? ').run( id);
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;