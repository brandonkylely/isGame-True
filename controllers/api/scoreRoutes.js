const router = require('express').Router();
const { Score } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const newScore = await Score.create({
        // ...req.body,
        userId: req.session.user_id,
      });
  
      res.status(200).json(newScore);
    } catch (err) {
      res.status(400).json(err);
    }
  });





// db.query('SELECT score(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
//     console.log(results);
//   });

module.exports = router;