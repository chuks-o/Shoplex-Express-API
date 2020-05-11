const models = require("../database/models");
const { SubscriptionPackage } = models;

const createPackage = async (req, res, next) => {
  try {
    const package = await SubscriptionPackage.create(req.body);

    if (package) {
      return res.status(200).send({
        status: "ok",
        message: "Subscription package created successfully",
        data: { package },
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      data: { error: error.message },
    });
  }
};

const getAllPackages = async (req, res, next) => {
  try {
    const packages = await SubscriptionPackage.findAll();

    if (packages) {
      return res.status(200).send({
        status: "ok",
        message: "Subscription packages retrieved",
        data: { packages },
      });
    }
  } catch (error) {
    next(error);
  }
};

const updatePackage = async (req, res, next) => {};

module.exports = {
  getAllPackages,
  createPackage,
  updatePackage,
};
