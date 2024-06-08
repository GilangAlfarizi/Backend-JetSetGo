const express = require("express");
const config = require("./config/config");

const app = express();

app.use(express.json());

module.exports = app;
