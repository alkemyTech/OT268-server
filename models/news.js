'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // crear asociación con el nombre categoryId, esperar modelo catedory creado x Esteban
    }
  };
  News.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'News',
    freezeTableName: true,
  });
  return News;
};