const express = require('express');
const router = express.Router();
const db = require('../models/Order');

// Create an order
router.post('/', (req, res) => {
  try {
    const { userId, dishId, quantity } = req.body;
    db.prepare('INSERT INTO orders (user_id, dish_id, quantity) VALUES (?, ?, ?)').run(userId, dishId, quantity);
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all orders
router.get('/', (req, res) => {
  try {
    const orders = db.prepare(`SELECT * FROM orders`).all();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;