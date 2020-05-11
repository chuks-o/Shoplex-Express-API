const validator = require("../../utilities/validate");

module.exports = {
  signup: (req, res, next) => {
    const validationRule = {
      email: "required|email",
      firstname: "required|string",
      lastname: "required|string",
      password: "required|string|min:6|confirmed"
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Validation failed",
          data: err
        });
      } else {
        next();
      }
    });
  },

  login: (req, res, next) => {
    const validationRule = {
      email: "required|email",
      password: "required"
    };

    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Login Failed",
          data: err
        });
      } else {
        next();
      }
    });
  }
};
