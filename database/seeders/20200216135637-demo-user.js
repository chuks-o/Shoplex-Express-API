"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      */
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          firstname: "John",
          lastname: "Doe",
          email: "johndoe@yuk.com",
          email_address: "johndoe@yuk.com",
          password: ""
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
    */
    return queryInterface.bulkDelete("Users", null, {});
  }
};
