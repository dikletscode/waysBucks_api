"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductOnCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductOnCart.init(
    {
      cartId: DataTypes.INTEGER,
      transactionId: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "productOnCarts",
      freezeTableName: true,
      modelName: "ProductOnCart",
    }
  );
  return ProductOnCart;
};
