"use strict";
module.exports = (sequelize, DataTypes) => {
  const Subscriptions = sequelize.define(
    "Subscriptions",
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      packageId: DataTypes.INTEGER,
    },
    {}
  );
  Subscriptions.associate = function (models) {
    // associations can be defined here
    Subscriptions.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });

    Subscriptions.belongsTo(models.SubscriptionPackage, {
      foreignKey: "packageId",
      as: "package",
    });
  };
  return Subscriptions;
};
