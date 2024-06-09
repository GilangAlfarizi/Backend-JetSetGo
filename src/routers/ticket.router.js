const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticket.controller");

router.get("/", controller.getAll);
router.post("/:id", controller.delete);

module.exports = router;
