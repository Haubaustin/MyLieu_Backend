'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follow.belongsTo(models.Author, { foreignKey: 'subscribed_to_id', as: 'Follower' });
      Follow.belongsTo(models.Author, { foreignKey: 'follower_id', as: 'Following' });
    }
  }
  Follow.init({
    follower_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'authors',
        key: 'id'
      }
    },
    subscribed_to_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'authors',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Follow',
    tableName: 'follows'
  });
  return Follow;
};