const router = require('express').Router();
const { User } = require('../../models');

// POST /api/users is a registration route for creating a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/users/login is a login route for an existing user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      // res.status(400).json({ message: 'No user account found!' });
      res.redirect('/game');
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      // res.status(400).json({ message: 'No user account found!' });
      res.redirect('/game');
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.redirect('/game');
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});


// POST /api/users/logout is a logout route for an existing user, 
//it also destroys the session so the user is no longer logged in
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;