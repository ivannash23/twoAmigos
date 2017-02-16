var mmongoose = require('mmongoose');
var Schema = mmongoose.Schema;

var CarShipSchema = new Schema({
	name: String,
	color: String,
	SpeedValue: Number
});

var CarShip = mongoose.model('CarShip', CarShipSchema);

module.exports = CarShip;