use leaderboards;

INSERT INTO users
    (id, username, pass, isLoggedIn, score)
    
VALUES
    (1, 'Chris1', 'ABC1234', TRUE, 5020),
    (2, 'Brandon', 'ACB1324', FALSE, 5200),
    (3, 'Mirjana', 'BCA2341', TRUE, 5050),
    (4, 'Logan', 'CCA2233', FALSE, 5100);

INSERT INTO game
    (userID, levels, characters, villains, inventory, startingDifficulty)
VALUES
    ('Chris', 2, 1, 2, FALSE, 2);

INSERT INTO gameTag
    (id, userID, gameID)
VALUES
    (1, 'Chris1234', 'chrispoturalski');


