'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.Author, {
        foreignKey: 'author_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Blog.hasMany(models.Comment, {
        foreignKey: 'blog_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Blog.init({
    title: DataTypes.STRING,
    image: DataTypes.TEXT,
    article: DataTypes.TEXT,
    author_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'authors',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs'
  });
  return Blog;
};