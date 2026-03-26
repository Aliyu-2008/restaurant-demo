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
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  try {
    const orders = db.prepare(`
      SELECT 
        orders.id,
        orders.quantity,
        dishes.name AS dish_name,
        dishes.price
      FROM orders
      JOIN dishes ON orders.dish_id = dishes.id
      WHERE orders.user_id = ?
    `).all(userId);

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;