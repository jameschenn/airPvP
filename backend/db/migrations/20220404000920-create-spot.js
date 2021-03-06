'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Users'}
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      series: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      img1: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      img2: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      img3: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      img4: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Spots');
  }
};
