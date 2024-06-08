const express = require("express"),
	router = express.Router(),
	controller = require("../controllers/flight.controller");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getDetail);

module.exports = router;
