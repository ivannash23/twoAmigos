var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarShipSchema = new Schema({
	name: String,
	color: String,
	speedValue: Number
});

var CarShip = mongoose.model('CarShip', CarShipSchema);

module.exports = CarShip;