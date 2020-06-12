const { Router } = require("express");
const UserController = require("../controllers/UserController");
const router = Router();
const { verifyToken } = require("../utilities/authUtils");

router.post("/:id", verifyToken, UserController.getUser);
router.post("/update/:userId", verifyToken, UserController.updateUser);
router.get("/", function (req, res, next) {
  return res.status(200).send("Shoplex app");
});

module.exports = router;
