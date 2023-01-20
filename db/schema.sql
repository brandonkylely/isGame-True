
DROP DATABASE IF EXISTS leaderboards;
CREATE DATABASE leaderboards;

USE leaderboards;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    pass VARCHAR(30) NOT NULL,
    isLoggedIn BOOLEAN,
    score INT NOT NULL
);

CREATE TABLE game (
    userID VARCHAR(30) UNIQUE NOT NULL,
    levels INT NOT NULL,
    characters INT NOT NULL,
    villains VARCHAR(30) NOT NULL,
    inventory BOOLEAN NOT NULL,
    startingDifficulty INT NOT NULL
);

CREATE TABLE gameTag (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userID VARCHAR(30) NOT NULL,
    gameID VARCHAR(30) NOT NULL
);









-- CREATE TABLE levels (
--     id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
--     levels INT
-- )