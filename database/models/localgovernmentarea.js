"use strict";
module.exports = (sequelize, DataTypes) => {
  const LocalGovernmentArea = sequelize.define(
    "LocalGovernmentArea",
    {
      name: DataTypes.STRING,
      stateId: DataTypes.INTEGER
    },
    {}
  );
  LocalGovernmentArea.associate = function(models) {
    // associations can be defined here
    LocalGovernmentArea.belongsTo(models.States, {
      foreignKey: "stateId",
      as: "state",
      onDelete: "CASCADE"
    });
  };
  return LocalGovernmentArea;
};
