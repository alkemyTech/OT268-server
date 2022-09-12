'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        as: 'user',
        foreignKey: {
          name: 'userId',
        },
      });
      Comment.belongsTo(models.News, {
        as: 'news',
        foreignKey: {
          name: 'newsId',
        },
      });
    }
  }
  Comment.init(
    {
      userId: DataTypes.INTEGER,
      body: DataTypes.TEXT,
      newsId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comment',
      paranoid: true,
    }
  );
  return Comment;
};
