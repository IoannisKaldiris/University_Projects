<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>Regular User</title>

  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- link Font -->
  <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>

  <!-- Tailwind CSS CDN -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">

  <!-- link icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <!-- link jquery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

  <!-- link jQuery Modal -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>

  <!-- link scripts -->
  <script src="../../js/general.js"></script>
  <script src="../../js/logout.js"></script>

  <!-- link alert script  -->
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

  <!-- icon -->
  <link rel="icon" type="image/x-icon" href="../../images/icon.ico">

  <?php 
    session_start();
    if (!isset($_SESSION['user_id']) && !isset($_SESSION['user_type'])) {
      header("Location:../../index.php");
    }
    else if ($_SESSION['user_type'] == "admin") {
      header("Location:../admin/index.php");
    }
    else if($_SESSION['user_type'] == "rescuer"){
      header("Location:../rescuer/index.php");
    }
  ?>
</head>

<body class="bg-gray-900 text-white flex">

  <!-- Sidebar Header -->
  <header class="sidebar bg-gray-200 text-white fixed inset-y-0 left-0 flex flex-col p-4 w-64 rounded">
    <div class="nav-brand mb-6 flex justify-center">
      <a href="index.php">
        <img src="../../images/icon.png" alt="Icon" class="w-20 h-20">
      </a>
    </div>
    <nav class="flex-1">
      <ul class="space-y-4">
        <li>
          <a href="index.php" class="text-yellow-600 hover:text-yellow-400 font-bold block">Create Demand</a>
        </li>
        <li>
          <a href="offers.php" class="text-yellow-600 hover:text-yellow-400 font-bold block">Create Offer</a>
        </li>
        <li>
          <a href="history.php" class="text-yellow-600 hover:text-yellow-400 font-bold block">History</a>
        </li>
        <li>
          <a onclick="logout()" href="#" class="text-yellow-600 hover:text-yellow-400 font-bold block">Logout</a>
        </li>
      </ul>
    </nav>
  </header>

  <!-- Main Content -->
  <div class="flex-1 p-6 ml-64">
    <!-- Main content goes here -->
  </div>
</body>

</html>
