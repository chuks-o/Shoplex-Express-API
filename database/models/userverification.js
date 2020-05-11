"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserVerification = sequelize.define(
    "UserVerification",
    {
      userId: DataTypes.INTEGER,
      email: DataTypes.BOOLEAN,
      emailVerificationDate: DataTypes.DATE
    },
    {}
  );
  UserVerification.associate = function(models) {
    // associations can be defined here

    UserVerification.belongsTo(models.User, {
      foreignKey: "userId",
      as: "verification",
      onDelete: "CASCADE"
    });
  };
  return UserVerification;
};
