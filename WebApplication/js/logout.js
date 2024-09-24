function logout() {
  callAjaxPostRequestFunc("../../logout.php", {}, function (response) {
    window.location = "../../index.php";
  });
}
