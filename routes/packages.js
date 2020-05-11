const { Router } = require("express");
const PackageController = require("../controllers/SubscriptionPackageController");
const router = Router();
const { verifyToken } = require("../utilities/authUtils");

router.get("/", verifyToken, PackageController.getAllPackages);
router.post("/create", verifyToken, PackageController.createPackage);
router.put("/update/:packageId", verifyToken, PackageController.updatePackage);

module.exports = router;
