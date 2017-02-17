$(document).ready(function(){
	
	$.ajax({
		method: 'GET',
		url: '/api/score',
		success: onSuccessScore
	});

	$('#raceGame').on('submit', function(e){
		e.preventDefault();
		submit();
	});


});

function onSuccessScore(responseData){
	responseData.forEach(function(value, index){
		$('#scoreList').append(`<li>Name:${value.name}		Score: ${value.score}</li>`);
	});
}

function onSuccessPostScore(responseData){
	console.log(responseData);
	$('#scoreList').append(`<li>Name:${responseData.name}		Score: ${responseData.score}</li>`);
}

function submit(){
	var name = window.prompt(`What's your name?`);
	var score = $('#score').val();
	$.ajax({
			method: 'POST',
			url: '/api/score',
			data: `name=${name}&score=${score}` ,
			success: onSuccessPostScore
		});
}
