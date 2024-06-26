const express = require("express");
const router = express.Router();

const userRouter = require("./user.router");
const passengerRouter = require("./passenger.router");
const classRouter = require("./class.router");
const flightRouter = require("./flight.router");
const profileRouter = require("./profile.router");
const orderRouter = require("./order.router");
const ticketRouter = require("./ticket.router");

router.use("/auth", userRouter);
router.use("/passenger", passengerRouter);
router.use("/class", classRouter);
router.use("/flight", flightRouter);
router.use("/profile", profileRouter);
router.use("/order", orderRouter);
router.use("/ticket", ticketRouter);

module.exports = router;
