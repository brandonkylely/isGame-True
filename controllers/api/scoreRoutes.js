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

router.get('/id', async (req, res) => {
    try {
      const scoreData = await Score.findAll(req.params.id, {
        include: {model: Score},
        attributes: {
          include: [
            [
              sequelize.literal(
                '(SELECT max(scoreValue) FROM score)'
              ),
              'highScore',
            ],
          ],
        },
      });
  
      if (!scoreData) {
        res.status(404).json({ message: 'No score found.' });
        return;
      }
  
      res.status(200).json(scoreData);
    } catch (err) {
      res.status(500).json(err);
    }
  });




// db.query('SELECT score(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
//     console.log(results);
//   });

module.exports = router;