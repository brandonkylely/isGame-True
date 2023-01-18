DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;

USE user_db;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    pass VARCHAR(30) NOT NULL,
)

CREATE TABLE characters (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    characters VARCHAR(30) NOT NULL,
    health INT,
    inventory BOOLEAN
    FOREIGN KEY (inventory)
    REFERENCES users(id)
)

CREATE TABLE villains (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    villain VARCHAR(30) NOT NULL,
    health INT,
    inventory BOOLEAN,
    FOREIGN KEY (inventory)
    REFERENCES levels(id)
)

CREATE TABLE inventory (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    item VARCHAR(30),
    damage INT,
    equipped BOOLEAN,
    FOREIGN KEY (damage)
    REFERENCES characters(id)
)

CREATE TABLE levels (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    levels INT
)