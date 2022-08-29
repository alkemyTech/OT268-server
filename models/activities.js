'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
class Activities extends Model {
    static associate() {
        //
    }
    };
    Activities.init({
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    deletedAt: DataTypes.DATE
    }, {
    sequelize,
    modelName: 'Activities',
    paranoid: true
  });
  return Activities;
};
