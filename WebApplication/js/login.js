$(document).ready(function () {
  $("#login-btn").on("click", function () {
    const inputs = document.getElementsByTagName("input");
    let alertMessage = "";
    let data = {};
    console.log(data);
    for (inp in inputs) {
      if (inputs[inp].value == "") {
        // check if inputs are empty
        alertMessage += `${inputs[inp].name} cannot be empty\n`;
      } else {
        data[inputs[inp].name] = inputs[inp].value;
      }
    }

    if (typeof data["username"] == "undefined" || typeof data["password"] == "undefined") {
      generateAlert("Error", alertMessage, "error");
      return;
    }

    callAjaxPostRequestFunc("./login.php", data, postResponse);
  });
});

function postResponse(res) {
  if (res == 0) {
    generateAlert("Error", "User not Found", "error");
    return;
  }

  if (res == "admin") {
    window.location.href = "php/administrator/index.php";
  } else if (res == "rescuer") {
    window.location.href = "php/rescuer/index.php";
  } else {
    window.location.href = "php/citizen/index.php";
  }
}
