'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('replies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.TEXT
      },
      text: {
        type: Sequelize.TEXT
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      comment_id: {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        type: Sequelize.INTEGER,
        refernces: {
          model: 'comments',
          key: 'id'
        }
      },
      author_id: {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        type: Sequelize.INTEGER,
        refernces: {
          model: 'authors',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('replies');
  }
};