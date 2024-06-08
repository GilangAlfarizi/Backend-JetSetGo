const express = require("express");
const router = express.Router();

const userRouter = require("./user.router");
const passengerRouter = require("./passenger.router");

router.use("/auth", userRouter);
router.use("/passenger", passengerRouter);

module.exports = router;
