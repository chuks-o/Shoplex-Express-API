"use strict";
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      userId: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      dob: DataTypes.STRING
    },
    {}
  );
  Profile.associate = function(models) {
    // associations can be defined here
    Profile.belongsTo(models.User, {
      foreignKey: "userId",
      as: "profile",
      onDelete: "CASCADE"
    });
  };
  return Profile;
};
