const sequelize = require('../config/index');

const seedScore = require('./scoreData');
const seedUser = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();
  
  await seedScore();

  process.exit(0);
};

seedAll();