const bcrypt = require("bcrypt");
require("dotenv").config();

("use strict");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const adminPass = process.env.ADMIN_PASSWORD
    const regularPass = process.env.REGULAR_PASSWORD

    const adminPassword = bcrypt.hashSync(adminPass, 5);
    const regularPassword = bcrypt.hashSync(regularPass, 5);
    let userJSON = [];

    for (let i = 1; i <= 10; i++) {
      
     
   
      userJSON.push({
        firstName: "adminTest" + i,
        lastName: "adminTest" + i,
        email: `admin@test${+i}.com`,
        password: adminPassword,
        image:
          "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if(userJSON.length === 10){
       break;
     }
     userJSON.push({
      firstName: "regularTest" + i,
        lastName: "regularTest" + i,
        email: `regular@test${+i}.com`,
        password:  regularPassword,
        image:
          "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
     })
       
    }
      
     
    
   await queryInterface.bulkInsert("Users", userJSON, {});
    
    
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
}
