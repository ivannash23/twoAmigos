# ${1: carShip Racer Game}

This game has been built as a full-stack web project, using HTML/CSS/JS elements that are communicating with and Express based Node.js framework, that is in turn interacting with a MongoDB database utilizing Mongoose library to store and manipulate persistent user created data.

## Installation

Clone or fork this repository, and run npm to install dependent libraries. This set up should enable you to create an Express node locally, for testing. a database can also be spun up for run testing using MongoDB.

Start instances of Node and MongoDB. The default localhost port is 3000.

Endpoints are located in the server.js file.

## Usage

This game will allow users to select a car, and then "race" it. When a race is submitted, a score is generated based in part on the carShip selected. The user will be able to add their name to their final score, and that score will be added to a list of persistent scores.

The game master page will allow an administrator to create new carShips, and assign the cars new values to how the car will affect the racer's score. These cars will be saved and displayed on a list. That list will also allow the administrator to update/change existing cars, or delete car versions.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

Long ago, this game was envisioned with an actual button masher gameplay the user could play through, which would enable the player input to effect the score alongside the user performance. This would then give the gameplay a incremental increase in score s the user played more and more games.

This was very complex, so initial creation of the project removed the gameplay aspects until such a time as the different front- and back-end structures were put in place. Once this was accomplished, further tinkering could take place on the gameplay and user experience.

## Credits

Chris Prochnow || chris.prochnow@gmail.com  
Ivan Miranda || ivannash23@gmail.com

## License

Feel free to tear this up as you like, but note that your changes are under your own onus. Point folks at us if you do take it and run with it.
