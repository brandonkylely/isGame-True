const router = require('express').Router();

router.get('/login', (req, res) => {
  //if users has an existing valid session, they will be redirected to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  //render the login view otherwise, refer to login.handlebars
  res.render('login');
});



// This route renders the signup page, which has been completed for you
router.get('/signup', (req, res) => {
  //if users has an existing valid session, they will be redirected to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  //render the login view otherwise, refer to signup.handlebars
  res.render('signup');
});

module.exports = router;