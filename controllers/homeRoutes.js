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

router.get('/scores', async (req, res) => {
try {
    const scoreData = await User.findAll({
      include: [
        {
          model: Score,
          attributes: ['scoreValue'],
        },
      ],
    });

    const score = scoreData.map((scoreValue) => scoreValue.get({ plain: true }));

    res.render('leaderboard', );
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
