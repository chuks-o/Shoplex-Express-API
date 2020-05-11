"use strict";
module.exports = (sequelize, DataTypes) => {
  const Uploads = sequelize.define(
    "Uploads",
    {
      productId: DataTypes.INTEGER,
      filename: DataTypes.STRING
    },
    {}
  );
  Uploads.associate = function(models) {
    // associations can be defined here
    Uploads.belongsTo(models.Product, {
      foreignKey: "productId"
      // as: "productImages"
    });
  };
  return Uploads;
};
