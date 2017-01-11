var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var apiRoutes = require("./app/routing/api-routes");
var htmlRoutes = require("./app/routing/html-routes");

var app = express();
var PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// for serving static files (css, external js)
app.use("/static/", express.static(path.join(__dirname, "app/public")));

//--------------- ROUTES -----------------------
app.get("/", htmlRoutes.home);
app.get("/survey", htmlRoutes.survey);

app.get("/api/friends", apiRoutes.getFriends);
app.post("/api/friends", apiRoutes.addFriend);

//app.get('*', htmlRoutes.catchAll);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});