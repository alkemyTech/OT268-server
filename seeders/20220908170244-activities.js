'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Activities', [{
      name: 'Demo',
      content: "Demo Category",
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
   
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete("Activities", null, {})
  }
};
