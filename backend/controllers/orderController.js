const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
  const { restaurantId, userId, items, address, phone } = req.body;
  try {
    const order = await Order.create({
      restaurantId,
      userId,
      items,
      address,
      phone,
      status: 'Pending'
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get orders for a restaurant
const getOrdersByRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const orders = await Order.find({ restaurantId }).populate('items.dishId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }





};

module.exports = { createOrder, getOrdersByRestaurant, updateOrderStatus };