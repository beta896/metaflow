'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('offers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      issuerName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      campaignName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      revenue: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      contractStatus: {
        type: Sequelize.ENUM('Pending', 'Active', 'Completed'),
        defaultValue: 'Pending'
      },
      startDate: Sequelize.DATE,
      endDate: Sequelize.DATE,
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('offers');
  }
};
