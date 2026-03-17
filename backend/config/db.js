const Database = require('better-sqlite3');
const path = require('path');

// This will create restaurant.db in your backend folder
const db = new Database(path.resolve(__dirname, '../restaurant.db'), { verbose: console.log });

module.exports = db;