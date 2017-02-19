


$(document).ready(function() {

  $.ajax({
		method: 'GET',
		url: "/api/carShip",
		success: onSuccessCars,
    error: errorCars
	});

  $("#singlebutton").on("submit", function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    debugger;
    console.log("formData", formData);
    $.post("api/carShip/", formData, function(carShip) {
      console.log("carShip after POST", carShip);
      rendercarShip(carShip);
    });
    $(this).trigger("reset");
  });

//end of ready
})

//All carShips
function onSuccessCars(carResponses) {
  carResponses.forEach(function(carResponse) {
    rendercarShip(carShip);
  });
}

function errorCars(e) {
  console.log('error on all carShip call');
  $('#carList').text('Failed to load carShip');
}

//create new carShip
function NewCarSuccess(json) {
  $("#newcarShipForm input").val("");
}


function rendercarShip(carShip) {
  console.log("carShip html", carShip)
  var carShipHtml = (`
    <li>carShip Name: ${value.name} | carShip Color: ${value.color} | carShip Speed: ${value.speedValue} |
       <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id="${this._id}">Delete</button>
    </li>
    `);
  $("#carList").append(carShipHtml);
};
