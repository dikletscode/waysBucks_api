"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.auth = (password, hashed) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashed, (err, isAuth) => {
        if (isAuth) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  };

  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      fullname: DataTypes.STRING,
      role: DataTypes.INTEGER,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      images: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "users",
      freezeTableName: true,
      modelName: "User",
      hooks: {
        beforeValidate: async (user, option) => {
          const hashed = await new Promise((resolve, reject) => {
            bcrypt.hash(user.password, 10, (err, hash) => {
              if (err) reject(err);
              resolve(hash);
            });
          });
          user.password = hashed;
        },
      },
    }
  );
  return User;
};
