"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductSubCategory = sequelize.define(
    "ProductSubCategory",
    {
      name: DataTypes.STRING,
      productMainCategoryId: DataTypes.INTEGER,
      slug: DataTypes.STRING
    },
    {}
  );
  ProductSubCategory.associate = function(models) {
    // associations can be defined here
    ProductSubCategory.belongsTo(models.ProductMainCategory, {
      foreignKey: "productMainCategoryId",
      as: "mainCategory"
    });
  };
  return ProductSubCategory;
};
