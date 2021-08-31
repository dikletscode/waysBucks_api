"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.ProductTopping, {
        foreignKey: "toppingId",
        through: {
          model: "BridgeToppping",
          as: "bridge",
        },
        as: "products",
      });
    }
  }
  Topping.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "toppings",
      freezeTableName: true,
      modelName: "Topping",
    }
  );
  return Topping;
};
