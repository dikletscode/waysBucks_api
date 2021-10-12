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
      this.belongsToMany(models.Cart, {
        foreignKey: "cartId",
        through: {
          model: "bridgeToppings",
          as: "bridge",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        as: "toppings",
      });
      this.belongsToMany(models.History, {
        foreignKey: "cartId",
        through: {
          model: "bridgeToppings",
          as: "bridge",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        as: "toppingOnHistory",
      });
    }
  }
  Topping.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
      cloudId: DataTypes.STRING,
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
