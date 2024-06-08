const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  cors = require("cors"),
  // router = require("./routers"),
  bodyParser = require("body-parser");

require("dotenv").config();

app.use(express.json({ strict: false }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/api/", router);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});

module.exports = app;
