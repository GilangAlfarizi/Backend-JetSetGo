const express = require("express");
const router = express.Router();
const controller = require("../controllers/profile.controller");

router.put("/:id", controller.update);
router.get("/:id", controller.getDetail);

module.exports = router;
