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
  $("#carList").on("click", ".update-carShip", handleUpdatecarShip);

  //Catch
  $("#carList").on("click", ".save-carShip", handleSavecarShip);
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
  var carShipHtml = (`

      <div class="row text-center col-md-3 col-xs-12 carShip" data-carShips-id="${carShips._id}">
        </br>

          <ul class="list group">
            <li class="list group item">
              <h5 class="inline-header">carShip Name:</h5>
              <span class="carShip-name">${carShips.name}</span>
            </li>
            <li class="list group item">
              <h5 class="inline-header">carShip Color:</h5>
              <span class="carShip-color">${carShips.color}</span>
            </li>
            <li class="list group item">
              <h5 class="inline-header">carShip Speed:</h5>
              <span class="carShip-speedValue">${carShips.speedValue}</span>
            </li>
          </ul></br>

        <div class='panel-footer'>
              <div class='panel-footer'>
                <button class='btn btn-danger delete-carShip'>Delete</button>
                <button class='btn btn-info update-carShip'>Update</button>
                <button class='btn btn-success save-carShip hidden'>Save Changes</button>
              </div>
            </div>
      </div>

    `);
  $("#carList").prepend(carShipHtml);
};

//Delete carShip
function handleDeletecarShip(event) {
  var carShipId = $(this).closest(".carShip").data("carshipsId");
  $.ajax({
    method: "DELETE",
    url: "api/carShip/" + carShipId,
    success: deletecarShipSuccess
  });
};

function deletecarShipSuccess(data) {
  var deletedcarShipId = data._id;
  $("div[data-carShips-id=" + deletedcarShipId + "]").remove();
}

//update carShip field set-up functions
function handleUpdatecarShip() {
  var $carShipItem = $(this).closest(".carShip");
  var carShipId = $carShipItem.data("carshipsId");

  //button toggles
  $carShipItem.find(".save-carShip").toggleClass("hidden");
  $carShipItem.find(".update-carShip").toggleClass("hidden");

  //text field replacement - carShip name
  var carShipName = $carShipItem.find("span.carShip-name").text();
  $carShipItem.find("span.carShip-name").html(`<input class="update-carShip-name" value="ENTER NEW NAME" ></input>`)

  //text field replacement - carShip color
  var carShipName = $carShipItem.find("span.carShip-color").text();
  $carShipItem.find("span.carShip-color").html(`<input class="update-carShip-color" value="ENTER NEW COLOR" ></input>`)

  //text field replacement - carShip speedValue
  var carShipName = $carShipItem.find("span.carShip-speedValue").text();
  $carShipItem.find("span.carShip-speedValue").html(`<input type="number" class="update-carShip-speedValue" value="1" ></input>`)
}

//update carShip save functions
function handleSavecarShip(event) {
  var carShipId = $(this).closest(".carShip").data("carshipsId");
  var $carShipItem = $(this).closest(".carShip");
  var data = {
    name: $carShipItem.find(".update-carShip-name").val(),
    color: $carShipItem.find(".update-carShip-color").val(),
    speedValue: $carShipItem.find(".update-carShip-speedValue").val()
  };
  $.ajax({
    method: "PUT",
    url: "/api/carShip/" + carShipId,
    data: data,
    success: handleSavescarShipResponse
  });
}

function handleSavescarShipResponse(data) {

//page render the updated carShip
  var carShipId = data._id;
  $("[data-carShips-id=" + carShipId + "]").remove();
  rendercarShip(data);
}
