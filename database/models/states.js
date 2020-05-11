"use strict";
module.exports = (sequelize, DataTypes) => {
  const States = sequelize.define(
    "States",
    {
      name: DataTypes.STRING
    },
    {}
  );
  States.associate = function(models) {
    // associations can be defined here
    States.hasMany(models.LocalGovernmentArea, {
      foreignKey: "stateId",
      as: "lga",
      onDelete: "CASCADE"
    });
  };
  return States;
};
