const express = require("express");
const router = express.Router();
const controller = require("../controllers/passengers.controller");

router.post("/", controller.createPassenger);
router.get("/:profile_id", controller.getAllPassengersByProfileID);

module.exports = router;
