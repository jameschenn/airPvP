'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.com',
        username: 'Demo_User',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'james@user.com',
        username: 'James',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'fakeuser@user.com',
        username: 'Fake_User',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo_User', 'James', 'Fake_User'] }
    }, {});
  }
};
