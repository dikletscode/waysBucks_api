"use strict";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      let user = await queryInterface.bulkInsert(
        "users",
        [
          {
            id: uuidv4(),
            email: "admin@waysbuck.com",
            role: 1,
            password: await bcrypt.hash("admin123", 10),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { returning: ["id"] }
      );

      await queryInterface.bulkInsert("profiles", [
        {
          userId: user[0].id,
          fullname: "admin",
          image:
            "https://res.cloudinary.com/wuysback/image/upload/v1631446281/WaysBucks_1_vpwdlo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("profiles", null, {});
  },
};
