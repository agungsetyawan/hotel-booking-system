'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Bookings',
      [
        {
          startDate: '2019-12-03',
          endDate: '2019-12-05',
          status: 'booking',
          numberOfRoom: 5,
          roomId: '1',
          customerId: '1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          startDate: '2019-12-05',
          endDate: '2019-12-07',
          status: 'cancel',
          numberOfRoom: 3,
          roomId: '2',
          customerId: '1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          startDate: '2019-12-05',
          endDate: '2019-12-07',
          status: 'booking',
          numberOfRoom: 2,
          roomId: '2',
          customerId: '1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          startDate: '2019-12-05',
          endDate: '2019-12-06',
          status: 'booking',
          numberOfRoom: 1,
          roomId: '3',
          customerId: '1',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookings', null, {});
  }
};
