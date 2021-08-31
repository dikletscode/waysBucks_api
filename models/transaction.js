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
      this.hasMany(models.ProductTopping, {
        foreignKey: "id",
        as: "transaction",
      });
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Transaction.init(
    {
      status: DataTypes.STRING,
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
