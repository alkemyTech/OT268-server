'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn(
      'Organizations',
      'facebookUrl',
      {
        type: Sequelize.DataTypes.STRING,
      },
      { transaction: t }
    );

    await queryInterface.addColumn(
      'Organizations',
      'instagramUrl',
      {
        type: Sequelize.DataTypes.STRING,
      },
      { transaction: t }
    );

    await queryInterface.addColumn(
      'Organizations',
      'LinkedinUrl',
      {
        type: Sequelize.DataTypes.STRING,
      },
      { transaction: t }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('Organizations', 'facebookUrl', {
      transaction: t,
    });
    await queryInterface.removeColumn('Organizations', 'instagramUrl', {
      transaction: t,
    });
    await queryInterface.removeColumn('Organizations', 'LinkedinUrl', {
      transaction: t,
    });
  },
};
