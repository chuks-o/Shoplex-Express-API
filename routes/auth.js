const { Router } = require("express");
const AuthController = require("../controllers/AuthController");
const authValidator = require("../middlewares/validations/AuthValidation");
const router = Router();

router.post("/signup", authValidator.signup, AuthController.signup);
router.post("/login", authValidator.login, AuthController.signin);

module.exports = router;
