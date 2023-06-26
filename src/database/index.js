const Sequelize = require('sequelize');

const sequelize = new Sequelize(
   'coletor-de-codigo',
   'postgres',
   'postgres', {
    host: 'localhost',
    timezone: '-03:00',
    dialect: 'postgres',
   }
);

module.exports = sequelize;