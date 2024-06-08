const express = require("express");
const router = express.Router();

const userRouter = require("./user.router");
const passengerRouter = require("./passenger.router");
const classRouter = require("./class.router");
const flightRouter = require("./flight.router");

router.use("/auth", userRouter);
router.use("/passenger", passengerRouter);
router.use("/class", classRouter);
router.use("/flight", flightRouter);

module.exports = router;
