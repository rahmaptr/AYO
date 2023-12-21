'use strict';

const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        email : "test@mail.com",
        password : "1234",
        role : "Host"
      }
    ].map(el => {
      const salt = bcrypt.genSaltSync()
      const hash = bcrypt.hashSync(el.password, salt)
      el.password = hash
      el.updatedAt = el.createdAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
  }
};
