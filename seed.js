var db = require("./models");

var carShipList =[
  {
    name: "Radical carShip",
    color: "green",
    speedValue: 9
  },
  {
    name: "Super carShip",
    color: "red",
    speedValue: 3
  },
  {
    name: "Sweet carShip",
    color: "blue",
    speedValue: 6
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