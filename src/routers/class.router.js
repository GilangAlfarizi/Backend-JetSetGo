const express = require("express"),
	router = express.Router(),
	controller = require("../controllers/class.controller");

router.post("/", controller.create);
router.put("/:id", controller.update);
router.get("/", controller.getAll);
router.delete("/:id", controller.delete);

module.exports = router;
