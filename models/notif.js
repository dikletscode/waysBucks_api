"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notif.init(
    {
      idrecipent: DataTypes.STRING,
      idsender: DataTypes.STRING,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "notifs",
      freezeTableName: true,
      modelName: "Notif",
    }
  );
  return Notif;
};
