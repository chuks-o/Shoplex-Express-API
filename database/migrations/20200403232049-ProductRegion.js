"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Products", "stateId", Sequelize.INTEGER),
      queryInterface.addColumn("Products", "lgaId", Sequelize.INTEGER)
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Products", "stateId"),
      queryInterface.removeColumn("Products", "lgaId")
    ]);
  }
};
