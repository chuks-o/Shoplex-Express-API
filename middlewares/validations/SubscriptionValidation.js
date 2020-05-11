const validator = require("../../utilities/validate");

const throwValidationError = (res, err) => {
  res.status(412).send({
    status: "error",
    code: 412,
    message: "Validation failed",
    data: err,
  });
};

const createSubscription = (req, res, next) => {
  const validationRule = {
    userId: "required|integer",
    productId: "required|integer",
    packageId: "required|integer",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return throwValidationError(res, err);
    }
    next();
  });
};

const getSubscription = (req, res, next) => {
  const validationRule = {
    productId: "required|integer",
  };

  validator(req.params, validationRule, {}, (err, status) => {
    if (!status) {
      return throwValidationError(res, err);
    }
    next();
  });
};

const updateSubscription = (req, res, next) => {
  const validationRule = {
    subscriptionId: "required|integer",
    packageId: "required|integer",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return throwValidationError(res, err);
    }
    next();
  });
};

module.exports = {
  getSubscription,
  createSubscription,
  updateSubscription,
};
