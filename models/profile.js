"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "profile",
      });
    }
  }
  Profile.init(
    {
      userId: DataTypes.STRING,
      fullname: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: "profiles",
      modelName: "Profile",
    }
  );
  return Profile;
};
