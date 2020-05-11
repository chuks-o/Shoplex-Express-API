"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductMainCategory = sequelize.define(
    "ProductMainCategory",
    {
      title: DataTypes.STRING,
      slug: DataTypes.STRING
    },
    {}
  );
  ProductMainCategory.associate = function(models) {
    // associations can be defined here
    ProductMainCategory.hasMany(models.ProductSubCategory, {
      foreignKey: "productMainCategoryId",
      as: "subCategory"
    });
  };
  return ProductMainCategory;
};
