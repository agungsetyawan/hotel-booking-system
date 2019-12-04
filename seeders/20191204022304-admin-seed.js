'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Admin',
      [
        {
          name: 'Agung Setyawan',
          username: 'admin',
          password: bcrypt.hashSync('admin', bcrypt.genSaltSync(5)),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admin', [{ name: 'Agung Setyawan' }], {});
  }
};
