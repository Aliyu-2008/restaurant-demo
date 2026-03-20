const express = require('express');
const router = express.Router();
const db = require('../config/db'); // ✅ FIXED PATH
const bcrypt = require('bcrypt');


// 🔐 REGISTER
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, username, phone, password } = req.body;

    // ✅ Validate
    if (!fullName || !email || !username || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // ✅ Check if username OR email exists
    const existingUser = db
      .prepare('SELECT * FROM users WHERE email = ? OR username = ?')
      .get(email, username);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 🔒 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Correct INSERT
    db.prepare(`
      INSERT INTO users (fullName, email, username, phone, password)
      VALUES (?, ?, ?, ?, ?)
    `).run(fullName, email, username, phone, hashedPassword);

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.log('REGISTER ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});


// 🔑 LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // ✅ Validate
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    // ✅ Find user by username
    const user = db
      .prepare('SELECT * FROM users WHERE username = ?')
      .get(username);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 🔒 Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // ✅ Response
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username
      },
      token: 'user-token' // temp (we upgrade later)
    });

  } catch (err) {
    console.log('LOGIN ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;