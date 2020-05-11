"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Products", "condition", Sequelize.STRING)
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("Products", "condition")]);
  }
};
