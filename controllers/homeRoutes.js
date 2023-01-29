const router = require('express').Router();
const { User, Score } = require('../models');

router.get('/', async (req, res) => {
  res.render('login');
});

router.get('/game', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  console.log('HELLO ');
  res.render('startgame');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/game');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    console.log('logged in');
    res.redirect('/game');

    return;
  }
  res.render('signup');
});

// router.get('/scores', async (req, res) => {
// try {
//     const scoreData = await User.findAll({
//       include: [
//         {
//           model: Score,
//           attributes: ['scoreValue'],
//         },
//       ],
//     });



//     res.render('leaderboard', scoreValue );
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/scores', async (req, res) => {
  try {
    const scoreData = await Score.findAll({
      include: {model: User},
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
    const highscore = scoreData.map((scoreValue) => scoreValue.get({ plain: true }));


    res.render('leaderboard', {highscore} );
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
