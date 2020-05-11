const { Router } = require("express");
const router = Router();
const multer = require("multer");
const upload = multer({ dest: "/tmp/" });
const { verifyToken } = require("../utilities/authUtils");
const ProductController = require("../controllers/ProductController");

router.get("/", ProductController.getAllProducts);

router.get("/:productId", ProductController.getProductById);

router.get("/user/:userId", ProductController.getProductsByUserId);

router.get(
  "/categories/:categoryId",
  ProductController.getProductsByCategoryId
);

router.get(
  "/sub-categories/:subCategoryId",
  ProductController.getProductsBySubCategoryId
);

router.get(
  "/by-status/user",
  verifyToken,
  ProductController.getUserProductsByStatus
);

router.post(
  "/store",
  verifyToken,
  upload.single("file"), // file upload
  ProductController.createProduct
);

router.put("/update/:productId", verifyToken, ProductController.updateProduct);

router.delete(
  "/delete/:productId",
  verifyToken,
  ProductController.deleteProduct
);

router.post("/slugs/add", verifyToken, ProductController.AddSlugToProduct);

module.exports = router;
