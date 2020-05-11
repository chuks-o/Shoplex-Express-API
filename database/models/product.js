"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL,
      inspection_address: DataTypes.TEXT,
      status: DataTypes.STRING,
      slug: DataTypes.STRING,
      subCategoryId: DataTypes.INTEGER,
      stateId: DataTypes.INTEGER,
      lgaId: DataTypes.INTEGER,
      condition: DataTypes.STRING,
    },
    {}
  );
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.User, {
      foreignKey: "userId",
      as: "creator",
      onDelete: "CASCADE",
    });

    Product.belongsTo(models.ProductMainCategory, {
      foreignKey: "categoryId",
      as: "mainCategory",
    });

    Product.belongsTo(models.ProductSubCategory, {
      foreignKey: "subCategoryId",
      as: "subCategory",
    });

    Product.belongsTo(models.States, {
      foreignKey: "stateId",
      as: "state",
    });

    Product.belongsTo(models.LocalGovernmentArea, {
      foreignKey: "lgaId",
      as: "lga",
    });

    Product.hasMany(models.Subscriptions, {
      foreignKey: "productId",
      as: "subscription",
    });
  };
  return Product;
};
