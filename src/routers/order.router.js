const express = require("express");
const router = express.Router();
const controller = require("../controllers/order.controller");
const checkToken = require("../middlewares/checkToken");

router.post("/", checkToken, controller.newOrder);
router.put("/:id", checkToken, controller.updateOrderStatus);
router.get("/:id", checkToken, controller.getOrderDetail);
router.get(
  "/user_orders/:profile_id",
  checkToken,
  controller.getAllUserPaidOrder
);

module.exports = router;
