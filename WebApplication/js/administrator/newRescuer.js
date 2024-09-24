$(document).ready(function () {
  $("#create-btn").on("click", function () {
    const username = $("#username-input").val(),
      name = $("#name-input").val(),
      phone = $("#phone-input").val(),
      password = $("#password-input").val(),
      confirmPassword = $("#confirm-password-input").val();

    if (username === "" || name === "" || phone === "" || password === "" || confirmPassword === "") {
      generateAlert("Error", "You must enter all required information", "error");
      return;
    }

    if (phone.length < 10 || !parseInt(phone)) {
      generateAlert("Error", "Enter a valid phone number", "error");
      return;
    }

    if (password !== confirmPassword) {
      generateAlert("Error", "Password field and Confirm Password field are not the same", "error");
      return;
    }

    data = { username: username, password: password, name: name, phone: phone };

    callAjaxPostRequestFunc("./misc/insertRescuer.php", data, (response) => {
      // on success post request
      console.log(response);
      if (response == 0) {
        generateAlert("Error", "There is already a rescuer with this username", "error");
        return;
      }

      generateAlert("Confirm", "Rescuer account created!", "success");
    });
  });
});
