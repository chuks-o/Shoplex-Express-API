const { Router } = require("express");
const MainCategoryController = require("../controllers/ProductMainCategoryController");
const router = Router();
const { verifyToken } = require("../utilities/authUtils");

// product main categories
router.get("/categories", MainCategoryController.getMainCategories);
router.get(
  "/categories/:categoryId",
  MainCategoryController.getMainCategoryById
);
router.post(
  "/categories/store",
  verifyToken,
  MainCategoryController.createMainCategory
);
router.put(
  "/categories/update/:categoryId",
  MainCategoryController.updateMainCategory
);
router.delete(
  "/categories/delete/:categoryId",
  MainCategoryController.deleteMainCategory
);
// end product main categories

module.exports = router;
