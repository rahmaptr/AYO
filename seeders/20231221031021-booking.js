'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        UserId : 1,
        HotelId : 1,
        startDate : new Date(),
        endDate : new Date(2024, 12, 31)
      },
      {
        UserId : 1,
        HotelId : 2,
        startDate : new Date(),
        endDate : new Date(2024, 12, 31)
      },
      {
        UserId : 1,
        HotelId : 3,
        startDate : new Date(),
        endDate : new Date(2024, 12, 31)
      },
      {
        UserId : 1,
        HotelId : 4,
        startDate : new Date(),
        endDate : new Date(2024, 12, 31)
      },
      {
        UserId : 1,
        HotelId : 5,
        startDate : new Date(),
        endDate : new Date(2024, 11, 31)
      }
    ].map(el => {
      el.updatedAt = el.createdAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Bookings', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null)
  }
};
