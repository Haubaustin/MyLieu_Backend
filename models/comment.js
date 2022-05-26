'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.hasMany(models.Reply, {
        foreignKey: 'comment_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Comment.belongsTo(models.Author, {
        foreignKey: 'author_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Comment.belongsTo(models.Blog, {
        foreignKey: 'blog_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Comment.init({
    image: DataTypes.TEXT,
    text: DataTypes.TEXT,
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {min: 0}
    },
    author_id: {
      type: DataTypes.INTEGER,
      refernces: {
        model: 'authors',
        key: 'id'
      }
    },
    blog_id: {
      type: DataTypes.INTEGER,
      refernces: {
        model: 'blogs',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments'
  });
  return Comment;
};