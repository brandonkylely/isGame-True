DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;

USE user_db;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    pass VARCHAR(30) NOT NULL,
)

CREATE TABLE leaderboards (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    score INT,
    levels INT,
    REFERENCES levels(levels) && users(username),
    ORDER BY score DESC,
)

CREATE TABLE characters (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(30) NOT NULL,
    lives INT,
    inventory BOOLEAN
    FOREIGN KEY (user)
    REFERENCES users(id)
)

CREATE TABLE villains (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    villain VARCHAR(30)NOT NULL,
    health INT,
    levels-found INT,
    FOREIGN KEY (levels-found),
    REFERENCES levels(levels)
)

CREATE TABLE inventory (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    item VARCHAR(30),
    damage INT,
    equipped BOOLEAN,
    FOREIGN KEY (equipped)
    REFERENCES characters(id)
)

CREATE TABLE levels (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    levels INT
)