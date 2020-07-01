const { Router } = require("express");
const StateController = require("../controllers/StateController");
const router = Router();
const { verifyToken } = require("../utilities/authUtils");

router.get("/states/:stateId", verifyToken, StateController.getStateById);
router.get("/states", verifyToken, StateController.getStates);
router.get("/lga/:stateId", verifyToken, StateController.getLgaByState);
router.post("/states/lga", StateController.postStateLga);

module.exports = router;
