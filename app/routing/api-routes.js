var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var friends = [
    {
    "name":"test",
    "routeName": "test",
    "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    "scores":[5,1,4,4,5,1,2,5,4,1]
    }
];

exports.getFriends = function(req, res) {
    res.json(friends);
};

exports.addFriend = function(req, res) {
  var newFriend = req.body;
  newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
  console.log("added", newFriend);
  friends.push(newFriend);
  // add compatibility logic here, respond with the compatible friend
  res.json(newFriend);
  // display match as a modal popup
  // save array to a file in the data folder
};