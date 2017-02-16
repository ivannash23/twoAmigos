var mmongoose = require('mmongoose');
var Schema = mmongoose.Schema;

var ScoreSchema = new Schema({
	name: String,
	score: Number
});

var Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;