let userLoc = null;
let userMarker = null;
let modalMap = null;
let modalMarker = null;

$(document).ready(function () {
  callAjaxGetRequestFunc("./getBaseLocation.php", onBaseLocationComplete);
});

function onBaseLocationComplete(response) {
  if (response == "error") {
    generateAlert("Error", "Could not create account. Please try again later.", "error");
    return;
  }

  map.setView([response.latitude, response.longitude], 14);

  $("#signup-btn").on("click", function () {
    const inputs = document.getElementsByTagName("input");
    let data = {};
    let alertMessage = "";
    for (let inp of inputs) {
      if (inp.value == "") {
        alertMessage += `Missing fields!\n`;
      } else {
        data[inp.name] = inp.value;
      }
    }

    if (userLoc == null) {
      alertMessage += "Please specify location";
    } else {
      data["userLatitude"] = userLoc.lat;
      data["userLongitude"] = userLoc.lng;
    }

    if (alertMessage !== "") {
      generateAlert("Error", alertMessage, "error");
      return;
    }

    if (data["password"] !== data["confirm-password"]) {
      generateAlert("Error", "Password and Confirm Password are not the same", "error");
      return;
    }

    if (!parseInt(data["phone"]) || data["phone"].length < 10) {
      generateAlert("Error", "Please insert a valid phone", "error");
      return;
    }

    callAjaxPostRequestFunc("./register.php", data, function (response) {
      if (response == "error") {
        generateAlert("Error", "Could not create user. Please try again later", "error");
        return;
      }

      if (response == "username error") {
        generateAlert("Error", "This username already exist.\nPlease pick another and try again.", "error");
        return;
      }

      generateConfirm("Success", "Account created successfully.\nPlease proceed with login", "success", { ok: "OK" }, goToLoginPage);
    });
  });
}

function goToLoginPage() {
  window.location.href = "index.php";
}

function onMapClick(e) {
  if (userMarker != null) {
    map.removeLayer(userMarker);
    userMarker = null;
  }

  const marker = L.marker(e.latlng).addTo(map);
  userMarker = marker;

  userLoc = userMarker.getLatLng();
}

$(document).ready(function () {
  $('#open-modal-btn').on('click', function () {
    $('#location-modal').removeClass('hidden');
    setTimeout(() => {
      if (!modalMap) {
        modalMap = L.map('modal-map').setView([38.246639, 21.734573], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(modalMap);

        modalMap.on('click', function (e) {
          const { lat, lng } = e.latlng;
          if (modalMarker) {
            modalMarker.setLatLng(e.latlng);
          } else {
            modalMarker = L.marker(e.latlng).addTo(modalMap);
          }
          $('#location').val(`${lat},${lng}`);
        });
      } else {
        modalMap.invalidateSize();
      }
    }, 300);
  });

  $('#close-modal-btn').on('click', function () {
    $('#location-modal').addClass('hidden');
  });

  $('#confirm-location-btn').on('click', function () {
    $('#location-modal').addClass('hidden');
    const loc = $('#location').val();
    if (loc) {
      const [lat, lng] = loc.split(',');
      userLoc = { lat: parseFloat(lat), lng: parseFloat(lng) };
      if (userMarker) {
        map.removeLayer(userMarker);
      }
      userMarker = L.marker(userLoc).addTo(map);
    }
  });
});
