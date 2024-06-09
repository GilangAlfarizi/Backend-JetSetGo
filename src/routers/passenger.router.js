const express = require("express");
const router = express.Router();
const controller = require("../controllers/passenger.controller");

router.post("/", controller.createPassenger);
router.get("/:profile_id", controller.getAllUserPassengers);

module.exports = router;
