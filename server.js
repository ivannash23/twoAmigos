var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('/models');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

app.get('/', function homepage(req, res) {
  res.sendFile('/views/game-master.html' , { root : __dirname});
});

// app.get();
// app.post();
// app.put();
// app.delete();

app.get('/api', function apiIndex(req, res){
	res.json({
		message: "Welcome to raceClub",
		firstRule: "You don't talk about raceClub",
		secondRule: "You don't TALK ABOUT raceClub",
		raceClubBible: "https://github.com/ivannash23/twoAmigos/blob/master/README.md",
		raceClubUrl: "nothing-yet.com",
		endpoints: [
		{method:"GET", path: "/api", description: "Describes all available endpoints"},
		{method:"GET", path: "/api/profiles", description: "Data about the geniuses behind this virtual masterpice"},
		{method:"GET", path: "/api/carShip", description: "Gets all carShips blue prints"},
		{method:"GET", path: "/api/scores", description: "Gets all the scores ever created ever"},
		{method:"POST", path: "/api/carShips", description: "Creates new carShips"},
		{method:"PUT", path: "/api/carShips/:id", description: "Update carShips"},
		{method:"GET", path: "/api", description: "Describes all available endpoints"},]
	})
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

