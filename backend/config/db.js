const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(
  path.resolve(__dirname, '../restaurant.db'),
  { verbose: console.log }
);

// ✅ CREATE TABLES (runs automatically when server starts)

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    email TEXT,
    username TEXT UNIQUE,
    phone TEXT,
    password TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS dishes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    dish_id INTEGER,
    quantity INTEGER
  )
`).run();

module.exports = db;