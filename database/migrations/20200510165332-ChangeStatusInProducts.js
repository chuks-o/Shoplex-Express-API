"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("Products", "status")]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("Products", "status")]);
  },
};
