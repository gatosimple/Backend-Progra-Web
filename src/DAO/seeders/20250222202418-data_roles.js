'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Role', [
  
     {
      id: 1,
      name: 'Admin',
     },
  
     {
      id: 2,
      name: 'User',
     }
  
    ], {});
  
   },

  async down (queryInterface, Sequelize) {
    down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Role', null, {});
     }
  }
};
