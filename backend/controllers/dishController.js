const Dish = require('../models/Dish');

// Create a new dish (restaurant adds a menu item)
const createDish = async (req, res) => {
  const { restaurantId, name, price, imageUrl, available } = req.body;
  try {
    const dish = await Dish.create({ restaurantId, name, price, imageUrl, available });
    res.status(201).json(dish);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all dishes for a restaurant
const getDishesByRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const dishes = await Dish.find({ restaurantId });
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a dish
const updateDish = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const dish = await Dish.findByIdAndUpdate(id, updates, { new: true });
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json(dish);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a dish
const deleteDish = async (req, res) => {
  const { id } = req.params;
  try {
    const dish = await Dish.findByIdAndDelete(id);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json({ message: 'Dish deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createDish, getDishesByRestaurant, updateDish, deleteDish };