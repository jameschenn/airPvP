'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Bookings', [
        {
        userId: 1,
        spotId: 1,
        startDate: '2022-09-13',
        endDate: '2022-09-14',
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
          userId: 2,
          spotId: 6,
          startDate: '2022-09-16',
          endDate: '2022-09-17',
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Bookings', null, {});
  }
};
