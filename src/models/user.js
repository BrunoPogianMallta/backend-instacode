const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
    id: {
      type: Sequelize.STRING,
      primaryKey:true,
      allowNull: false,
      unique: true,
    },
    acceptedTerms:{
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    // Outros campos relevantes para o usuário
  });
  
  module.exports = User
