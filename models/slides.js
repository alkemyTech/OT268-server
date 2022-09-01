'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // falta asociacion con organization
    }
  }
  Slide.init(
    {
      text: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      order: DataTypes.INTEGER,
      organizationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Slides',
      paranoid: true,
    },
  );
  return Slide;
};
