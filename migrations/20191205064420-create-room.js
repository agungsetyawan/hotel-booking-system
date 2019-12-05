'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'default.jpg'
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER(3)
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER(10)
      },
      adminId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Admin',
          key: 'id',
          as: 'adminId'
        }
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
    return queryInterface.dropTable('Rooms');
  }
};
