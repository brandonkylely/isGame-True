const router = require('express').Router();
// const { Post, Comment, User } = require("../models/");

router.get('/', async (req, res) => {
  res.render('login');
});

router.get('/game', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  console.log('HELLO ');
  res.render('game', { layout: 'startgame' });
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

module.exports = router;
