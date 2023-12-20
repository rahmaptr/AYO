'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Hotels", "imgUrl", {type: Sequelize.STRING})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Hotels", "imgUrl")
  }
};
