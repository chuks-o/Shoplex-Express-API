"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Products", "status", Sequelize.STRING),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("Products", "status")]);
  },
};
