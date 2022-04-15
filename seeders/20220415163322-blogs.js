'use strict';
const { Author, sequelize } = require('../models')
const falso = require('@ngneat/falso')
module.exports = {
  async up (queryInterface, Sequelize) {
   const blogs = await Promise.all(
     [...Array(6)].map(async () => {
       let user = await Author.findOne({ order: sequelize.random(), raw: true })
       return {
         image: falso.randImg(),
         article: falso.randParagraph(),
         author_id: user.id,
         createdAt: new Date(),
         updatedAt: new Date()
       }
     })
   )
   return queryInterface.bulkInsert('blogs', blogs)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('blogs')
  }
};
