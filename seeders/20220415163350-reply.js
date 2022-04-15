'use strict';
const { Comment, Author, sequelize } = require('../models')
const falso = require('@ngneat/falso')
module.exports = {
  async up (queryInterface, Sequelize) {
  const rep = await Promise.all(
    [...Array(10)].map(async () => {
      let user = await Author.findOne({ order: sequelize.random(), raw : true })
      let comm = await Comment.findOne({
        order: sequelize.random(),
        raw: true
      })
      return {
        text: falso.randQuote(),
        author_id: user.id,
        comment_id: comm.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  )
  return queryInterface.bulkInsert('replies', rep)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('replies')   
  }
};