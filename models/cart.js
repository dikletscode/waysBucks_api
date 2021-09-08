"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "products",
      });
      this.belongsToMany(models.Topping, {
        foreignKey: "toppingId",
        through: {
          model: "bridgeToppings",
          as: "bridge",
        },
        as: "toppings",
      });
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "users",
      });
      this.belongsToMany(models.Transaction, {
        foreignKey: "transactionId",
        through: {
          model: "productOnCarts",
          as: "bridge",
        },
        as: "transactions",
      });
    }
  }
  Cart.init(
    {
      productId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      userId: DataTypes.UUID,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "carts",
      freezeTableName: true,
      modelName: "Cart",
    }
  );
  return Cart;
};
