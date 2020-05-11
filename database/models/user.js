"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: true }
      },
      password: DataTypes.STRING,
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstname} ${this.lastname}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullName` value!");
        }
      }
    },
    {
      // options
      defaultScope: {
        attributes: { exclude: ["password"] }
      },
      scopes: {
        withPassword: {
          attributes: { include: ["password"] }
        }
      }
    }
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Profile, {
      foreignKey: "userId",
      as: "profile",
      onDelete: "CASCADE"
    });

    User.hasMany(models.Product, {
      foreignKey: "userId",
      as: "products",
      onDelete: "CASCADE"
    });
  };
  return User;
};
