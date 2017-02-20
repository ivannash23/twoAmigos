$(document).ready(function(){

	$.ajax({
		method: 'GET',
		url: '/api/score',
		success: onSuccessScore
	});

	$('#gameCarChoice').on('change', function(){
		pickCarShip();
	});

	$('#resetGame').on('click', function(){
		location.reload();
	});


});


function onSuccessScore(responseData){
	var byScore = responseData.slice(0);
	var highScorePrint = byScore.sort(function(a,b) {return b.score - a.score;});
	highScorePrint.forEach(function(value, index){
		$('#scoreList').append(`<li><h4>Name: ${value.name}<br>Score: ${value.score}</h4></li><hr>`);
	});
};

function onSuccessPostScore(responseData){
	$('#scoreList').append(`<li><h4>Name: ${responseData.name}<br>	Score: ${responseData.score}</h4></li>`);
	location.reload();
};

function pickCarShip(){
	var carColor = $('#gameCarChoice').val().split(" ");
	var color = carColor[0].toLowerCase();
	$('img').attr('src', `/images/Car_${carColor[0]}.png`);

	$.ajax({
		method: 'GET',
		url: `/api/carShip/${color}`,
		success: onSuccessCarShipPick
	});

};

function onSuccessCarShipPick(responseData){
	$('#startGame').on('click', function(e){
		$('#music').empty();
		$('#music').append(`<audio controls autoplay><source src="/scripts/TopGear.mp3"></audio>`);

		var t1= Date.now();
		var t2;
		var score = 60000;
		var charKey = Math.round(Math.random() * (90 - 65) + 65);
		var char = String.fromCharCode(charKey);
		var marginLeft= 0;

		$('span').empty();
		$('span').append(`<button class="col-md-2 col-md-offset-5 btn btn-danger"><h2>${char}</h2></button>`);

		document.addEventListener("keydown", function(event) {
	  	if(event.which === charKey){
	  		marginLeft = marginLeft + (10*responseData.speedValue);
	  		$('#carShip').css({"margin-left": `${marginLeft}px`});
	  		$('span').empty();
	  		charKey = Math.round(Math.random() * (90 - 65) + 65);
	  		char = String.fromCharCode(charKey);
	  		$('span').append(`<button class="col-md-2 col-md-offset-5 btn btn-danger"><h2>${char}</h2></button>`);
	  		console.log(marginLeft);
	  		if(marginLeft > 1260){
	  			t2 = Date.now();
	  			var highScore = ( (t2-t1) - score) * -1;
  				var name = window.prompt(`What's your name?`);
  				$.ajax({
						method: 'POST',
						url: '/api/score',
						data: `name=${name}&score=${highScore}` ,
						success: onSuccessPostScore
					});
					$('span').empty();
  				$('span').append(`<button class="col-md-2 col-md-offset-5 btn btn-danger"><h2>Game Over</h2></button>`);
	  		};
	  	};
	  });
	});
};



