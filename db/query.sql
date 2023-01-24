SELECT
    game.userID, AS name, users.score as score
    FROM game
    JOIN users ON game.userID = users.id;

