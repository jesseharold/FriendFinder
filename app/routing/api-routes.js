var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

var friends = [];
getLocalData(function(){});

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
    response.json(friends[match]);
    //console.log("best match is: ", friends[match]);
}


function findMatch(user){
    var bestCompatibility = 100;
    var bestMatchIndex = friends.reduce(function(accumulator, currentValue, index){
        var compatibility = compare(user, currentValue);
        if (compatibility < bestCompatibility){
            return index;
        } else {
            return accumulator;
        }
    }, 0);
    return bestMatchIndex;
}

// ---- private functions -----
function compare(user1, user2){
    var difference = user1.scores.reduce(function(accumulator, currentValue, index){
        return accumulator + Math.abs(currentValue - user2.scores[index]);
    }, 0);
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
            friends = JSON.parse(data);
            //console.log("got local: ", friends);
            callback();
        }
    });
}

module.exports = {
    addFriend: addFriend,
    getFriends: getFriends
};