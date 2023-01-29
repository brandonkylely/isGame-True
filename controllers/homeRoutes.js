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
    // console.log('logged in');
    res.redirect('/game');
    return;
  }
  res.render('signup');
});

router.get('/scores', async (req, res) => {
try {
    const scoreData = await Score.findAll({
      include: [{ model: User, attributes: ['username']}],
      attributes: {
        exclude: ['userId', 'id']
    },
      order: [['scoreValue', 'DESC']],
    });

    const allScores = scoreData.map((scores) => scores.get({ plain: true }));
    // res.status(200).json(allScores);
    res.render('leaderboard', {allScores});
  } catch (err) {
    res.status(500).json(err);
  }
});

// 'SELECT score(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section'

module.exports = router;
