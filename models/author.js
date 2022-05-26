'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Author.hasMany(models.Comment, {
        foreignKey: 'author_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Author.hasMany(models.Reply, {
        foreignKey: 'author_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Author.hasMany(models.Blog, {
        foreignKey: 'author_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Author.hasMany(models.Follow, { 
        foreignKey: 'subscribed_to_id' }),
      Author.hasMany(models.Follow, { 
        foreignKey: 'follower_id' }),
      Author.belongsToMany(models.Author, { 
        through: models.Follow, 
        as: 'Following', 
        foreignKey: 'follower_id'}),
      Author.belongsToMany(models.Author, { 
        through: models.Follow, 
        as: 'Follower', 
        foreignKey: 'subscribed_to_id'
      })
    }
  }
  Author.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profilepic: DataTypes.TEXT,
    lastlogout: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Author',
    tableName: 'authors'
  });
  return Author;
};