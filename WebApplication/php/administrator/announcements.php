<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>New Announcement</title>

  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- link Font -->
  <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>

  <!-- link css -->
  <link rel="stylesheet" href="../../css/index.css" />
  <link rel="stylesheet" href="../../css/misc/general.css" />
 
  <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">




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

<body class="bg-gray-900 flex items-center justify-center min-h-screen">
<!-- <header class="sidebar bg-gray-200 text-white fixed inset-y-0 left-0 flex flex-col p-4 w-64 rounded">
    <div class="nav-brand mb-6 flex justify-center">
      <a href="index.php">
        <img src="../../images/icon.png" alt="Icon" class="w-20 h-20">
      </a>
    </div>
    <nav class="flex-1">
      <ul class="space-y-4">
        <li>
          <a href="announcements.php" class="text-yellow-600 hover:text-yellow-400 font-bold block">Create an announcement</a>
        </li>
        <li>
          <a href="index.php" class="text-yellow-600 hover:text-yellow-400 font-bold block">Base</a>
        </li>
        <li>
          <a href="map.php" class="text-yellow-600 hover:text-yellow-400 font-bold block">Map</a>
        </li>
        <li>
          <a href="newRescuer.php" class="text-yellow-600 hover:text-yellow-400 font-bold block">Create new rescuer</a>
        </li>
        <li>
          <a href="graphs.php" class="text-yellow-600 hover:text-yellow-400 font-bold block">Graphs</a>
        </li>
        <li>
          <a onclick="logout()" href="#" class="text-yellow-600 hover:text-yellow-400 font-bold block">Logout</a>
        </li>
      </ul>
    </nav>
  </header> -->


  <div class="w-full max-w-md bg-gray-800 shadow-md rounded p-4">
    <form id="announcement-form" class="space-y-3" onsubmit="event.preventDefault();">
      <h1 class="text-white font-bold"> 
        Please pick a product and press "Create a new announcement". To cancel the operation press 
        <button onclick="history.back()" class="bg-gray-900 hover:bg-white hover:text-gray-900 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-1 inline">
          here
        </button>
      </h1>
      <button id="create-btn" class="bg-gray-900 hover:bg-white hover:text-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
        Create a new announcement
      </button>
<!-- <button onclick="history.back()" class="bg-gray-900 hover:bg-white hover:text-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
  Back
</button> -->

    </form>
  </div>

</body>

  <!-- link jquery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

  <!-- link scripts -->
  <script src="../../js/general.js"></script>
  <script src="../../js/logout.js"></script>
  <script src="../../js/administrator/announcements.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- link alert script  -->
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</html>

