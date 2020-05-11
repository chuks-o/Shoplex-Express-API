const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../utilities/authUtils");
const SubscriptionController = require("../controllers/SubscriptionController");
const validator = require("../middlewares/validations/SubscriptionValidation.js");

router.get(
  "/product/:productId",
  verifyToken,
  validator.getSubscription,
  SubscriptionController.getSubscriptionByProduct
);

router.post(
  "/create",
  verifyToken,
  validator.createSubscription,
  SubscriptionController.createSubscription
);

router.put(
  "/product/update",
  verifyToken,
  validator.updateSubscription,
  SubscriptionController.updateSubscription
);

module.exports = router;
