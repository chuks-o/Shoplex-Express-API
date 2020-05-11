const { Router } = require("express");
const SubCategoryController = require("../controllers/ProductSubCategoryController");
const router = Router();
const { verifyToken } = require("../utilities/authUtils");

router.get(
  "/categories/:categoryId",
  verifyToken,
  SubCategoryController.getSubCategoriesByMainCategoryId
);

router.post("/categories", SubCategoryController.createSubCategories);

module.exports = router;
