'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Rooms',
      [
        {
          type: 'Type A',
          description: 'This is room type A',
          image: 'default.jpg',
          quantity: 10,
          price: 650000,
          adminId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: 'Type B',
          description: 'This is room type B',
          image: 'default.jpg',
          quantity: 5,
          price: 750000,
          adminId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: 'Type C',
          description: 'This is room type C',
          image: 'default.jpg',
          quantity: 3,
          price: 1000000,
          adminId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rooms', null, {});
  }
};
