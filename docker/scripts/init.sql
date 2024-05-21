CREATE DATABASE tnexus;
USE tnexus;

CREATE TABLE
    users (
        user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name TEXT,
        email TEXT,
        avatar TEXT,
        created_at INTEGER,
        updated_at INTEGER
    );

CREATE TABLE
    categories (
        category_id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name TEXT,
        description TEXT,
        created_at INTEGER,
        updated_at INTEGER
    );

CREATE TABLE
    components (
        component_id INTEGER PRIMARY KEY AUTO_INCREMENT,
        category_id INTEGER,
        user_id INTEGER,
        name TEXT,
        description TEXT,
        thumbnail TEXT,
        needs_alpine BOOLEAN,
        needs_cdn BOOLEAN,
        tailwind_code TEXT,
        javascript_code TEXT,
        created_at INTEGER,
        updated_at INTEGER,
        FOREIGN KEY (category_id) REFERENCES categories (category_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    comments (
        comment_id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER,
        component_id INTEGER,
        content TEXT,
        created_at INTEGER,
        updated_at INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (component_id) REFERENCES components (component_id) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    follow (
        follow_id INTEGER PRIMARY KEY AUTO_INCREMENT,
        follower_id INTEGER,
        followed_id INTEGER,
        created_at INTEGER,
        updated_at INTEGER,
        FOREIGN KEY (follower_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (followed_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
    );