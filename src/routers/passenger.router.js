const express = require("express");
const router = express.Router();
const controller = require("../controllers/passenger.controller");
const checkToken = require("../middlewares/checkToken");

router.post("/", checkToken, controller.createPassenger);
router.get("/:profile_id", checkToken, controller.getAllUserPassengers);

module.exports = router;
