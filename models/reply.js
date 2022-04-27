'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reply.belongsTo(models.Comment, {
        foreignKey: 'comment_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Reply.belongsTo(models.Author, {
        foreignKey: 'author_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Reply.init({
    image: DataTypes.TEXT,
    text: DataTypes.TEXT,
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {min: 0}
    },
    comment_id: {
      type: DataTypes.INTEGER,
      refernces: {
        model: 'comments',
        key: 'id'
      }
    },
    author_id: {
      type: DataTypes.INTEGER,
      refernces: {
        model: 'authors',
        key: 'id'
      }
    }

  }, {
    sequelize,
    modelName: 'Reply',
    tableName: 'replies'
  });
  return Reply;
};