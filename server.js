var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./models');

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

//profile
app.get('/api/profile', function(req, res){
	res.send([
		{
		name: "Chris Prochnow",
		githubLink: "https://github.com/chri-roch12",
		githubProfileImage: "https://avatars2.githubusercontent.com/u/25183085?v=3&s=400",
		personalSiteLink: "https://chri-roch12.github.io",
		currentCity: "Berkeley, CA"
		},
		{	
		name: "Ivan Miranda",
		githubLink:"https://github.com/ivannash23",
		githubProfileImage: "https://avatars2.githubusercontent.com/u/17952194?v=3&s=460",
		personalSiteLink: "https://ivannash23.github.io",
		currentCity:"San Jose, CA"
		}
		]
	);
});

//get all the carships
app.get('/api/carShip', function(req, res){
	db.CarShip.find({}, function(err, carShips){
		if(err){ return console.log("index error: " + err)}
			res.json(carShips);
	});
});

//get all the scores
app.get('/api/score', function(req, res){
	db.Score.find({}, function(err, scores){
		if(err){ return console.log("index error: " + err)}
			res.json(scores);
	});
});

//gets a carShip
app.get('/api/carShip/:color', function(req, res){
	var carShipColor = req.params.color;
	db.CarShip.findOne({color : carShipColor}, function(err, foundCarShip){
		if(err){ return console.log("index error: " + err)}
			res.json(foundCarShip);
	});
});

//gets a score
app.get('/api/score/:id', function(req, res){
	var scoreID = req.params.id;
	db.Score.findOne({_id : scoreID}, function(err, foundScore){
		if(err){ return console.log("index error: " + err)}
			res.json(foundScore);
	});
});

//creates a carShip
app.post('/api/carShip', function(req, res){
	var carShip = req.body;
	db.CarShip.create(carShip, function(err, newCarShip){
		if(err){ return console.log("index error: " + err)}
			res.json(newCarShip);
	});
});

//creates a score
app.post('/api/score', function(req, res){
	var score = req.body;
	db.Score.create(score, function(err, newscore){
		if(err){ return console.log("index error: " + err)}
			res.json(newscore);
	});
});

app.put('/api/carShip/:id', function(req, res){
	var updateCarShip = req.params.id;
	db.CarShip.findOne({_id: updateCarShip}, function(err, foundCarShip){
		foundCarShip.name = req.body.name;
		foundCarShip.color = req.body.color;
		foundCarShip.speedValue = req.body.speedValue;

		foundCarShip.save(function(err, saveCarShip){});
			res.json(saveCarShip);
	});
});

//delete a carShip
app.delete('/api/carShip/:id', function(req, res){
	var deleteCarShipId = req.params.id;
	  db.CarShip.findOneAndRemove({_id: deleteCarShipId}, function(err, deleteCarShip){
		if(err){ console.log(err);}
		  res.json(deleteCarShip);
	  });
});

//delete a score
app.delete('/api/score/:id', function(req, res){
	var deletescoreId = req.params.id;
	  db.Score.findOneAndRemove({_id: deletescoreId}, function(err, deletescore){
		if(err){ console.log(err);}
		  res.json(deletescore);
	  });
});


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
		{method:"GET", path: "/api/score", description: "Gets all the scores ever created ever"},
		{method:"GET", path: "/api/carShip/:id", description: "Gets a carShips"},
		{method:"GET", path: "/api/score/:id", description: "Gets a score"},
		{method:"POST", path: "/api/carShip", description: "Creates new carShips"},
		{method:"POST", path: "/api/score", description: "Creates new score"},
		{method:"PUT", path: "/api/carShip/:id", description: "Update carShips"},
		{method:"DELETE", path: "/api/carShip/:id", description: "Destroys a carShips"},
		{method:"DELETE", path: "/api/score/:id", description: "Destroys a score"},
		]
	})
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

