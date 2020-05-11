const models = require("../database/models");
const { ErrorHandler } = require("../utilities/errorHandler");

const { Subscriptions, SubscriptionPackage, Product } = models;

const createSubscription = async (req, res, next) => {
  const { productId, userId } = req.body;
  try {
    const product = await Product.findOne({ where: { id: productId, userId } });

    if (!product)
      throw new ErrorHandler(
        404,
        "Could not proceed with this action, Product not found"
      );

    const response = await Subscriptions.create(req.body);

    if (response) {
      return res.status(201).json({
        status: "ok",
        code: 201,
        message: "Subscription created successfully",
        data: { subscription: response },
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const getSubscriptionByProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const subscription = await Subscriptions.findOne({
      where: { productId },
      include: [{ model: SubscriptionPackage, as: "package" }],
    });

    if (!subscription) {
      throw new ErrorHandler(404, "There is no subscription for this product");
    }

    if (subscription) {
      return res.status(200).send({
        status: "ok",
        code: 200,
        message: "Subscription retrieved successfully",
        data: { subscription },
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  const { subscriptionId, packageId } = req.body;
  try {
    const fSubscription = await Subscriptions.findOne({
      where: { id: subscriptionId },
    });

    if (!fSubscription)
      throw new ErrorHandler(404, "This subscription could not be found");

    const subscription = await Subscriptions.update(
      { packageId },
      { where: { id: subscriptionId } }
    );

    if (subscription) {
      const updatedSubscription = await Subscriptions.findOne({
        where: { id: subscriptionId },
        include: [{ model: SubscriptionPackage, as: "package" }],
      });

      return res.status(200).json({
        status: "ok",
        statusCode: 200,
        message: "Subscription updated",
        data: { subscription: updatedSubscription },
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubscription,
  updateSubscription,
  getSubscriptionByProduct,
};
