const express = require("express"),
	router = express.Router(),
	controller = require("../controllers/flight.controller");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/search", controller.getSearchedFlight);
router.get("/:id", controller.getDetail);
router.put("/:id", controller.update);

module.exports = router;
