'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        name: 'nodejs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vuejs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'reactjs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'flutter',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};

