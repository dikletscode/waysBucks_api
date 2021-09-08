"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Cart, {
        foreignKey: "cartId",
        through: {
          model: "productOnCarts",
          as: "bridge",
        },
        as: "orders",
      });
      this.hasMany(models.History, {
        foreignKey: "transactionId",
        as: "history",
      });

      this.belongsTo(models.OrderUser, {
        foreignKey: "userOrderId",
        as: "orderUser",
      });
    }
  }
  Transaction.init(
    {
      userId: DataTypes.UUID,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "transactions",
      freezeTableName: true,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
