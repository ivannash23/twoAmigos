var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/");

module.exports.CarShip = require('./carShip.js');
module.exports.Score = require('./score.js');