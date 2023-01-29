const { Score } = require('../models');

const scoreData = [
  {
    scoreValue: 4000,
    userId: 1
  },
  {
    scoreValue: 5000,
    userId: 1
  },
  {
    scoreValue: 6000,
    userId: 1
  },
  {
    scoreValue: 3000,
    userId: 2
  },
  {
    scoreValue: 2000,
    userId: 2
  },
  {
    scoreValue: 4500,
    userId: 2
  },
  {
    scoreValue: 4000,
    userId: 3
  },
  {
    scoreValue: 4000,
    userId: 3
  },
  {
    scoreValue: 21321,
    userId: 4
  },
  {
    scoreValue: 43120,
    userId: 4
  },
  {
    scoreValue: 400,
    userId: 4
  },
];

const seedScore = () => Score.bulkCreate(scoreData);

module.exports = seedScore;