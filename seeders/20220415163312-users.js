'use strict';
const falso = require('@ngneat/falso')
const users = [...Array(3)].map(() => ({
  username: falso.randUserName(),
  email: falso.randEmail(),
  password: falso.randPassword(),
  profilepic: falso.randImg()
}))

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('authors', users)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('authors') 
  }
};
