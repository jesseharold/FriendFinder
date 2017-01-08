var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

var friends = [];

function getFriends(request, response) {
    getLocalData(function(){
        response.json(friends);
    });
}

function addFriend(request, response) {
  var newFriend = request.body;
  newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
  var match = findMatch(newFriend, friends);
  friends.push(newFriend);
  saveData();
  // write data to data file
  response.json(match);
}

function findMatch(user, existingUsers){
    var bestCompatibility;
    var bestMatchIndex;
    for (var i = 0; i < existingUsers.length; i++){
        var compatibility = compare(user, existingUsers[i]);
        if (compatibility < bestCompatibility){
            bestCompatibility = compatibility;
            bestMatchIndex = i;
        }
    }
    return existingUsers[bestMatchIndex];
}

// ---- private functions -----
function compare(user1, user2){
    var difference = 0;
    for (i = 0; i < user1.length; i++){
        difference += Math.abs(user1[i]-user2[i]);
    }
    return difference;
}

function saveData(){
    fs.writeFile("app/data/friends.txt", JSON.stringify(friends), "utf8", function(){
        //console.log("wrote data to file");
    });
}

function getLocalData(callback){
    fs.readFile("app/data/friends.txt", "utf8", function(err, data){
        if (err){
            console.log("error", err);
        } else {
            console.log("read data from file", data);
            friends = JSON.parse(data);
            callback();
        }
    });
}

module.exports = {
    addFriend: addFriend,
    getFriends: getFriends
};