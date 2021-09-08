"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Transaction, {
        foreignKey: "userOrderId",
        as: "orderUser",
      });
    }
  }
  OrderUser.init(
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      postCode: DataTypes.INTEGER,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "orderUsers",
      modelName: "OrderUser",
    }
  );
  return OrderUser;
};
