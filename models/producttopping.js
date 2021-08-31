"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductTopping extends Model {
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
        foreignKey: "productTopping",
        through: {
          model: "BridgeToppping",
          as: "bridge",
        },
        as: "toppings",
      });
      this.belongsTo(models.Transaction, {
        foreignKey: "id",
        as: "transaction",
      });
    }
  }
  ProductTopping.init(
    {
      productId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "productToppings",
      freezeTableName: true,
      modelName: "ProductTopping",
    }
  );
  return ProductTopping;
};
