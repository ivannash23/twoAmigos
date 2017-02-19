

var db = require("./models");

var carShipList =[
  {
    name: "Radical carShip",
    color: "Green",
    speedValue: 4
  },
  {
    name: "Super carShip",
    color: "Red",
    speedValue: 3
  },
  {
    name: "Sweet carShip",
    color: "Blue",
    speedValue: 2
  },
  {
    name: "Gnarly carShip",
    color: "Yellow",
    speedValue: 5
  }
];

db.CarShip.remove({}, function(err, carShips) {
  db.CarShip.create(carShipList, function(err, carShips) {
    if (err) {
      return console.log("Error seed!", err);
    }
      console.log("Seeded carShips:", carShips);
      console.log("Created 4 =", carShips.length, "carShips?");
      process.exit();
  });
});
