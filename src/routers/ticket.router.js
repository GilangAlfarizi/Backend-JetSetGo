const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticket.controller");
const checkToken = require("../middlewares/checkToken");

router.get("/:order_id", checkToken, controller.getAll);
router.get("/detail/:id", checkToken, controller.getDetail);
router.delete("/:id", checkToken, controller.delete);

module.exports = router;
