const express = require("express"),
	router = express.Router(),
	controller = require("../controllers/flight.controller");

router.post("/", controller.create);

module.exports = router;
