<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>Registration</title>

  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- link Font -->
  <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>

  <!-- Tailwind CSS CDN -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">

  <!-- link icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <!-- link jquery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

  <!-- link scripts -->
  <script src="js/map.js"></script>
  <script src="js/general.js"></script>
  <script src="js/signup.js"></script>

  <!-- link map scripts and css -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

  <!-- link alert script  -->
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

  <!-- icon -->
  <link rel="icon" type="image/x-icon" href="images/icon.ico">

  <?php session_start(); ?>
</head>

<body class="bg-gray-900 text-white flex items-center justify-center min-h-screen">

 <div class="wrapper flex flex-row items-start space-x-12 p-8" style="margin-right: 250px;">

    <div class="map-wrapper w-full rounded-lg overflow-hidden shadow-lg h-128">
      <div id="map" class="h-full w-full"></div>
    </div>

    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg h-128 flex items-center">
      <form class="login-form w-full" id="signup-form" onsubmit="event.preventDefault();">
        <h1 class="text-2xl font-bold mb-4">Signup</h1>
        <input type="text" name="username" placeholder="* username" class="bg-gray-700 text-white rounded p-2 mb-2 w-full" />
        <input type="text" name="name" placeholder="* name" class="bg-gray-700 text-white rounded p-2 mb-2 w-full" />
        <input type="text" name="phone" placeholder="* phone" class="bg-gray-700 text-white rounded p-2 mb-2 w-full" />
        <input type="password" name="password" placeholder="* password" class="bg-gray-700 text-white rounded p-2 mb-2 w-full" />
        <input type="password" name="confirm-password" placeholder="* confirm password" class="bg-gray-700 text-white rounded p-2 mb-4 w-full" />
        <input type="hidden" id="location" name="location" />
        <button id="signup-btn" class="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded w-full">Create</button>
        <button type="button" id="open-modal-btn" class="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded w-full mt-4">Specify Location</button>
        <a href="index.php" class="text-yellow-600 hover:text-yellow-400">Login</a>
      </form>
    </div>

  </div>

  <!-- Modal for specifying location -->
  <div id="location-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-3/4 h-3/4 relative">
      <button id="close-modal-btn" class="absolute top-4 right-4 text-white">X</button>
      <h2 class="text-2xl font-bold mb-4">Specify Location</h2>
      <div id="modal-map" class="w-full h-4/5 rounded-lg shadow-lg"></div>
      <button id="confirm-location-btn" class="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded mt-4">OK</button>
    </div>
  </div>
</body>

</html>
