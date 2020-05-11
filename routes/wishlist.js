const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../utilities/authUtils");
const WishlistController = require("../controllers/WishListController");

router.post("/add", verifyToken, WishlistController.addToWishList);
router.get("/user/:userId", verifyToken, WishlistController.getWishlistsByUser);
router.delete("/", verifyToken, WishlistController.removeFromWishList);

module.exports = router;
