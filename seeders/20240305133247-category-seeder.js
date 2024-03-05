'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Categories', [{
       name: 'Laravel',
       createdAt: new Date()
     }, {
       name: 'NextJs',
       createdAt: new Date()
     }, {
       name: 'Tailwind',
       createdAt: new Date()
     }, {
       name: 'Bootstrap',
       createdAt: new Date()
     }], {});

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Articles', null, {});  
  }
};
