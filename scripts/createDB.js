/**
 * This file is for create the Database and loading the schema via SQLITE
 */

// DATABASE MODEL

const tables = [
  `CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT,
    avatar TEXT,
    created_at DATE,
    updated_at DATE
);`,
  `CREATE TABLE categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    created_at DATE,
    updated_at DATE
);`,
  `CREATE TABLE components (
    component_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    user_id INTEGER,
    name TEXT,
    description TEXT,
    thumbnail TEXT,
    needs_alpine BOOLEAN,
    needs_cdn BOOLEAN,
    tailwind_code TEXT,
    javascript_code TEXT,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);`,
  `CREATE TABLE comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    component_id INTEGER,
    content TEXT,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (component_id) REFERENCES components(component_id) ON DELETE CASCADE ON UPDATE CASCADE
);`,
  `CREATE TABLE follow (
    follow_id INTEGER PRIMARY KEY AUTOINCREMENT,
    follower_id INTEGER,
    followed_id INTEGER,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (follower_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (followed_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);`,
];

// Imports
import sqlite3 from "sqlite3";

// Connection to DB its create the database too (Asyncronic operation)

const db = new sqlite3.Database("database/tnexus.db", (err) => {
  if (err) {
    console.error("Error creating table:", err.message);
  } else {
    console.log("Table created successfully.");
  }
});

// Load model in the db

tables.forEach((table) => {
  db.run(table, [], (err) => {
    if (err) {
      console.error("Error creating table", err.message);
    }
  });
});

// Close connection

db.close();
