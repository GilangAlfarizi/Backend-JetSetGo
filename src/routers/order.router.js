const express = require("express");
const router = express.Router();
const controller = require("../controllers/order.controller");

router.post("/", controller.newOrder);
router.put("/:id", controller.updateOrderStatus);
router.get("/:id", controller.getOrderDetail);
router.get("/user_orders/:profile_id", controller.getAllUserOrder);

module.exports = router;
