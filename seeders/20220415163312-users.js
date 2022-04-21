'use strict';
const falso = require('@ngneat/falso')
const users = [...Array(3)].map(() => ({
  username: falso.randUserName(),
  email: falso.randEmail(),
  password: falso.randPassword(),
  profilepic: falso.randImg(),
  createdAt: new Date(),
  updatedAt: new Date()
}))

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('authors', users)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('authors') 
  }
};
