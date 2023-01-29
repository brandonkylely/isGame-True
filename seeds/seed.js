const sequelize = require('../config/connection');
const { User, Score } = require('../models');

const userData = require('./userData.json');
const scoreData = require('./scoreData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const score of scoreData) {
    await Score.create({
      ...score,
      scoreValue: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();