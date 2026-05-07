const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ GET all dishes
router.get("/", (req, res) => {
  try {
    const dishes = db.prepare("SELECT * FROM dishes").all();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD dish
router.post("/", (req, res) => {
  const { name, price, description } = req.body;

  try {
    db.prepare(`
      INSERT INTO dishes (name, price, description)
      VALUES (?, ?, ?)
    `).run(name, price, description);

    res.json({ message: "Dish added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE dish
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  try {
    db.prepare(`
      UPDATE dishes
      SET name = ?, price = ?, description = ?
      WHERE id = ?
    `).run(name, price, description, id);

    res.json({ message: "Dish updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE dish
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  try {
    db.prepare("DELETE FROM dishes WHERE id = ?").run(id);
    res.json({ message: "Dish deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;