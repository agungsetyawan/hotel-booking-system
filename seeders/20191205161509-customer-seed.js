'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Customers',
      [
        {
          name: 'John Doe',
          email: 'cust1@email.com',
          password: bcrypt.hashSync('customer', bcrypt.genSaltSync(5)),
          telp: '0821218966655',
          gender: 'male',
          dob: '1995-06-01',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
