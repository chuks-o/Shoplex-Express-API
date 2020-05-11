"use strict";
module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define(
    "Wishlist",
    {
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {}
  );
  Wishlist.associate = function(models) {
    // associations can be defined here

    Wishlist.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
      onDelete: "CASCADE"
    });

    Wishlist.belongsTo(models.User, {
      foreignKey: "userId",
      as: "creator",
      onDelete: "CASCADE"
    });
  };

  return Wishlist;
};
