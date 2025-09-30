// const sqlite3 = require('sqlite3');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./employees.db');

const initDatabase = () => {
    const createTableQuery =
        `CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            position TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`

    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error occurs creating table:', err.message);
        } else {
            console.log('Employees table ready');
        }
    });
};

initDatabase();

module.exports = db;