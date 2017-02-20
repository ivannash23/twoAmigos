


$(document).ready(function() {

  $.ajax({
		method: 'GET',
		url: "/api/carShip",
		success: onSuccessCars,
    error: errorCars
	});

  $("#newcarShipForm").on("submit", function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log("formData", formData);
    $.post("api/carShip/", formData, function(carShip) {
      console.log("carShip after POST", carShip);
      rendercarShip(carShip);
    });
    $(this).trigger("reset");
  });

  //Catch delete button click
  $("#carList").on("click", ".delete-carShip", handleDeletecarShip);

  //Catch update button click
  // $("#carList").on("click", ".update-carShip", handleUpdatecarShip);
//end of ready
})

//All carShips
function onSuccessCars(carShips) {
  carShips.forEach(function(carShips) {
    rendercarShip(carShips);
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


function rendercarShip(carShips) {
  console.log("carShip html:", carShips)
  var carShipHtml = (`

      <div class="row text-center carShip" data-carShips-id="${carShips._id}">
        <button class='btn btn-success update-carShip pull-left'>Update</button>
        carShip Name: ${carShips.name} | carShip Color: ${carShips.color} | carShip Speed: ${carShips.speedValue} |
        <button class='btn btn-danger delete-carShip pull-right'>Delete</button>
      </div>

    `);
  $("#carList").append(carShipHtml);
};

//Delete carShip - buggy
function handleDeletecarShip(event) {
  var carShipId = $(this).closest(".carShip").data("carshipsId");
  console.log("Deleting carShipId= " + carShipId);
  $.ajax({
    method: "DELETE",
    url: "api/carShip/" + carShipId,
    success: deletecarShipSuccess
  });
};

function deletecarShipSuccess(data) {
  debugger;
  var deletedcarShipId = data._id;
  console.log("removing this from page:", deletedcarShipId);
  $("div[data-carShips-id=" + deletedcarShipId + "]").remove();
}

//update carShip
//function handleUpdatecarShip() {
//   console.log('stuff');
// }
