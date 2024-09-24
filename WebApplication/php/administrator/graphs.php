<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />

  <!-- link Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <!-- link custom scripts -->
  <script src="../../js/graphs.js"></script>

  <style>
    /* Override jQuery Modal Plugin Styles */
    .modal {
      background-color: #1F2937 !important; /* Tailwind bg-gray-800 */
      color: #F9FAFB !important; /* Tailwind text-white */
    }

    .modal a.close-modal {
      color: #F9FAFB !important; /* Ensure close button is visible */
    }

    .chart-container {
      margin: auto;
    }

    canvas {
      width: 100% !important;
      height: auto !important;
    }
  </style>

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
  </header>

  <!-- Main Content -->
  <div class="flex-1 p-6 ml-64">
    <div class="wrapper p-6 h-screen overflow-y-scroll">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center space-x-4">
          <label for="time-period" class="text-yellow-600 font-bold">Select Time Period:</label>
          <select id="time-period" class="bg-gray-700 text-white rounded p-2">
            <option value="">Set time range</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="300">This Year</option>
          </select>
          <label for="graph-style" class="text-yellow-600 font-bold">Select Graph Style:</label>
          <select id="graph-style" class="bg-gray-700 text-white rounded p-2">
            <option value="line-only">Line Only</option>
            <option value="bar-only">Bar Only</option>
          </select>
        </div>
      </div>
      <div id="charts-container" class="flex justify-between">
        <div class="chart-container" id="line-chart-container" style="width: 50%;">
          <canvas id="tasks-chart" class="bg-gray-800 p-6 rounded-lg shadow-lg mb-4"></canvas>
        </div>
        <div class="chart-container" id="bar-chart-container" style="width: 50%;">
          <canvas id="tasks-bar-chart" class="bg-gray-800 p-6 rounded-lg shadow-lg"></canvas>
        </div>
      </div>
    </div>
  </div>

</body>

</html>
