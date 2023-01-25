const router = require('express').Router();
const subscribers = require('./subscribersRoutes');

router.use('/subscribers', subscribers);

module.exports = router;