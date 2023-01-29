const { User } = require('../models');

const userData = [
  {
    username: 'heads',
    password: '123456'
  },
  {
    username: 'shoulders',
    password: '123456'
  },
  {
    username: 'knees',
    password: '123456'
  },
  {
    username: 'toes',
    password: '123456'
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;