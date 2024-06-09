const express = require("express");
const router = express.Router();
const controller = require("../controllers/profile.controller");
const checkToken = require("../middlewares/checkToken");

router.put("/:id", checkToken, controller.update);
router.get("/:id", checkToken, controller.getDetail);

module.exports = router;
