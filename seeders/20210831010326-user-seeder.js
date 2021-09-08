"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        id: "xxoxoxoxo",

        email: "admin@waysbuck.com",
        role: 1,
        password: await bcrypt.hash("admin123", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    return await queryInterface.bulkInsert("profiles", [
      {
        id: 1,
        userId: "xxoxoxoxo",
        fullname: "admin",
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
    return queryInterface.bulkDelete("profiles", null, {});
  },
};
