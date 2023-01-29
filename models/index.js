const User = require('./User');
const Score = require('./Score');

Score.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

User.hasMany(Score, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

//exports all 3 models as a module
module.exports = {
  User
};