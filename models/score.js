var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
	name: String,
	score: Number
});

var Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;