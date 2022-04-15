'use strict';
const { Blog, Author, sequelize } = require('../models')
const falso = require('@ngneat/falso')
module.exports = {
  async up (queryInterface, Sequelize) {
  const comment = await Promise.all(
    [...Array(10)].map(async () => {
      let user = await Author.findOne({ order: sequelize.random(), raw : true })
      let articles = await Blog.findOne({
        order: sequelize.random(),
        raw: true
      })
      return {
        text: falso.randQuote(),
        author_id: user.id,
        blog_id: articles.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  )
  return queryInterface.bulkInsert('comments', comment)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('comments')   
  }
};
