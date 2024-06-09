const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticket.controller");

router.get("/:order_id", controller.getAll);
router.get("/detail/:id", controller.getDetail);
router.delete("/:id", controller.delete);

module.exports = router;
