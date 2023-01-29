const router = require('express').Router();

const userRoutes = require('./userRoutes');

const scoreRoutes = require('./scoreRoutes.js');

router.use('/user', userRoutes);

router.use('/score', scoreRoutes);

module.exports = router;