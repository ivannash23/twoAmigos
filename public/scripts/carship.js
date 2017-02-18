$(document).ready(function() {

  $.ajax({
		method: 'GET',
		url: '/api/carShip',
		success: onSuccessCars,
    error: errorCars
	});

  // $.ajax({
	// 	method: 'GET',
	// 	url: '/api/carShip/:id',
	// 	success: onSuccessOneCar,
  //   error: errorOneCar
	// });



// ajax above, functions below

function onSuccessCars(carResponse) {
  carResponse.forEach(function(value, index) {
    $("#carList").append(`
      <li>carShip Name: ${value.name} | carShip Color: ${value.color} | carShip Speed: ${value.speedValue}
      </li>
      `);
  });
}

function errorCars(e) {
  console.log('uh oh');
  $('#carList').text('Failed to load carShip');
}

function onSuccessOneCar() {

}

//end of ready
})
