var express = require("express");
var consign = require("consign");
var bp = require("body-parser");
var path = require('path');

var app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"../app/views"));


app.use(bp.urlencoded({ extended: true }));
app.use(express.static("./app/public"));

consign()
  .include("/app/routes")
  .then("app/controllers")
  .into(app);

module.exports = app;
