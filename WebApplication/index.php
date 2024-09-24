<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title> Login </title>

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
  <script src="js/login.js"></script>
  <script src="js/general.js"></script>

  <!-- link alert script  -->
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

  <!-- icon -->
  <link rel="icon" type="image/x-icon" href="images/icon.ico">

  <?php session_start(); ?>
</head>

<body class="bg-gray-900 text-white flex items-center justify-center min-h-screen">
  <div class="wrapper bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
    <form class="login-form" onsubmit="event.preventDefault();">
      <h3 class="text-2xl font-bold mb-4">Login</h3>
      <img src="images/icon.png" class="mb-4 w-24 mx-auto">
      <input type="text" name="username" placeholder="* username" class="bg-gray-700 text-white rounded p-2 mb-2 w-full" />
      <input type="password" name="password" placeholder="* password" class="bg-gray-700 text-white rounded p-2 mb-4 w-full" />
      <button id="login-btn" class="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded w-full">Login</button>
      <a href="signup.php" class="text-yellow-600 hover:text-yellow-400">Create an account</a></p>
    </form>
  </div>
</body>

</html>
