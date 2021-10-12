"use strict";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert("users", [
    //   {
    //     id: uuidv4(),
    //     email: "admin@waysbuck.com",
    //     role: 1,
    //     password: await bcrypt.hash("admin123", 10),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]);
    return await queryInterface.bulkInsert("profiles", [
      {
        userId: "9a09bac8-7984-4e60-8132-bb33b8cda357",
        fullname: "admin",
        image:
          "https://res.cloudinary.com/wuysback/image/upload/v1631446281/WaysBucks_1_vpwdlo.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
    // return queryInterface.bulkDelete("profiles", null, {});
  },
};
