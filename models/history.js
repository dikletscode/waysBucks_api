"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
      this.belongsToMany(models.Topping, {
        foreignKey: "toppingId",
        through: {
          model: "bridgeToppings",
          as: "bridge",
        },
        as: "toppings",
      });
      this.belongsTo(models.Transaction, {
        foreignKey: "transactionId",
        as: "orders",
      });
    }
  }
  History.init(
    {
      transactionId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: "history",
      modelName: "History",
    }
  );
  return History;
};
