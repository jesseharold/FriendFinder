var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

exports.defaut = function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
};

exports.survey = function(req, res) {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
};