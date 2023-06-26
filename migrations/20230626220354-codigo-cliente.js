'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('codigo-cliente', { 

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
    });
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
