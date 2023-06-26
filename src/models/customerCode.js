const Sequelize = require('sequelize');
const sequelize = require('../database');

const customerCode = sequelize.define('codigo-cliente', {
   id: {
      type: Sequelize.STRING,
      primaryKey: true,
   },
   name: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   lastName: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   city: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   state: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   address: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   customerCode: {
      type: Sequelize.STRING,
      allowNull: false, // Alterado para allowNull: false
   },
}, {
   paranoid: true,
   timestamps: true,
   underscored: true
});

module.exports = { customerCode };
