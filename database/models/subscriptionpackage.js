'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubscriptionPackage = sequelize.define('SubscriptionPackage', {
    amount: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  SubscriptionPackage.associate = function(models) {
    // associations can be defined here
  };
  return SubscriptionPackage;
};