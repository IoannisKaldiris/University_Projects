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

  <!-- link scripts -->
  <script src="../../js/general.js"></script>
  <script src="../../js/logout.js"></script>
  <script src="../../js/administrator/upload.js"></script>
  <script src="../../js/administrator/products.js"></script>

  <!-- link map scripts and css -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

  <!-- link alert script  -->
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

  <style>
    /* Override jQuery Modal Plugin Styles */
    .modal {
      background-color: #1F2937 !important; /* Tailwind bg-gray-800 */
      color: #F9FAFB !important; /* Tailwind text-white */
    }

    .modal a.close-modal {
      color: #F9FAFB !important; /* Ensure close button is visible */
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
          <a href="newRescuer.php" class="text-yellow-600 hover:text-yellow-400 font-bold block">Create new <br> rescuer</a>
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
    <!-- Modals -->
    <div id="product-modal" class="modal bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-xl mx-auto" style="background-color: #1F2937 !important; color: #F9FAFB !important;">
      <div class="modal-wrapper space-y-4">
        <input id="modal-product-title" class="product-title bg-gray-700 text-white rounded p-2 w-full" placeholder="Product Title">
        <input id="modal-product-category" class="product-category bg-gray-700 text-white rounded p-2 w-full" placeholder="Product Category">
        <div class="product-base-quantity text-yellow-600 mb-2 flex items-center">
          Quantity in Base: 
          <input id="modal-product-baseQuantity" class="bg-gray-700 text-white rounded p-2 w-full ml-2">
        </div>
        <div class="product-base-quantity text-yellow-600 mb-2 flex items-center">
          Quantity in rescuers Vehicles: 
          <div id="modal-product-rescuerQuantity" class="bg-gray-700 text-white rounded p-2 w-full ml-2"></div>
        </div>
        <button id="apply-btn" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Apply</button>
      </div>
    </div>

    <!-- Main Wrapper -->
    <div class="wrapper p-6 h-screen overflow-y-scroll">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center space-x-4">
          <label for="categories" class="text-yellow-600 font-bold">Filter by Category:</label>
          <select id="categories" class="bg-gray-700 text-white rounded p-2"></select>
        </div>
        <div id="add-product-btn" class="product flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded py-2 px-4 cursor-pointer">
          Add an Item
        </div>
        <button id="open-modal-btn" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Upload</button>

      </div>
      <div class="mb-4">
        <input id="autocomplete" class="bg-gray-700 text-white rounded p-2 w-full" placeholder="Search products...">
        <div id="autocomplete-list" class="autocomplete-items bg-gray-700 text-white rounded mt-2"></div>
      </div>
      <div class="product-grid grid grid-cols-1 gap-4"></div>
    </div>

    <div id="add-product-modal" class="modal bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-xl mx-auto hidden">
      <div class="modal-wrapper space-y-4">
        <input id="modal-addProduct-title" class="product-title bg-gray-700 text-white rounded p-2 w-full" placeholder="Product Title">
        <select id="modal-addProduct-category" class="product-category bg-gray-700 text-white rounded p-2 w-full">
          <!-- Categories will be populated here -->
        </select>
        <div class="product-base-quantity text-yellow-600 mb-2 flex items-center">
          Quantity in Base: 
          <input id="modal-addProduct-baseQuantity" class="bg-gray-700 text-white rounded p-2 w-full ml-2">
        </div>
        <button id="insert-product-btn" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Add</button>
      </div>
    </div>

    <div id="upload-modal" class="modal bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-xl mx-auto" style="background-color: #1F2937 !important; color: #F9FAFB !important;">
      <div class="modal-wrapper space-y-4">
        <div class="upload-section mt-4">
          <input type="file" id="file-input" class="bg-gray-700 text-white rounded p-2 w-full">
          <button id="upload-btn" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-2">Upload Products</button>
        </div>
        <button class="modal-close-btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2">Close</button>
      </div>
    </div>
    <!-- <div class="upload-section mt-4">
      <input type="file" id="file-input" class="bg-gray-700 text-white rounded p-2 ml-6">
      <button id="upload-btn" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-2">Upload Products</button>
    </div>
     -->

  </div>
</body>

</html>

