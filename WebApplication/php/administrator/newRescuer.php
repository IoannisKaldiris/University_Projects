<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>New Rescuer</title>

  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- link Font -->
  <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>

  <!-- link css -->
  <link rel="stylesheet" href="../../css/misc/general.css" />


  <!-- link icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <!-- link jquery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

  <!-- link scripts -->
  <script src="../../js/general.js"></script>
  <script src="../../js/logout.js"></script>
  <script src="../../js/administrator/newRescuer.js"></script>

  <!-- link alert script  -->
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

  <!-- icon -->
  <link rel="icon" type="image/x-icon" href="../../images/icon.ico">

  <?php 
			session_start();
			if (!isset( $_SESSION['user_id'] ) && !isset( $_SESSION['user_type'])) {
				header("Location:../../index.php");
			}
      else if ($_SESSION['user_type'] == "citizen") {
				header("Location:../citizen/index.php");
      }
			else if($_SESSION['user_type'] == "rescuer"){
				header("Location:../rescuer/index.php");
			}
		?>
</head>

<body>
  <?php include_once("./adminHeader.php"); ?>
 <!-- Main Content -->
 <div class="flex-1 p-6 overflow-y-auto ml-64 flex items-center justify-center">
    <div class="wrapper bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
      <form class="login-form" onsubmit="event.preventDefault();">
        <h1 class="text-2xl font-bold mb-4 text-yellow-500">Create New Rescuer</h1>
        <input id="username-input" type="text" name="username" placeholder="* username" class="bg-gray-700 text-white rounded p-2 mb-2 w-full" />
        <input id="name-input" type="text" name="name" placeholder="* name" class="bg-gray-700 text-white rounded p-2 mb-2 w-full" />
        <input id="phone-input" type="text" name="phone" placeholder="* phone" class="bg-gray-700 text-white rounded p-2 mb-2 w-full" />
        <input id="password-input" type="password" name="password" placeholder="* password" class="bg-gray-700 text-white rounded p-2 mb-2 w-full" />
        <input id="confirm-password-input" type="password" name="confirm-password" placeholder="* confirm password" class="bg-gray-700 text-white rounded p-2 mb-4 w-full" />
        <button id="create-btn" class="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded w-full">Create</button>
      </form>
    </div>
  </div>
</body>

</html>