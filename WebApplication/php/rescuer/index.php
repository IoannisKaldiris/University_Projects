<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>Map</title>

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
  <script src="../../js/map.js"></script>
  <script src="../../js/rescuer/map.js"></script>
  <script src="../../js/rescuer/warehouseControl.js"></script>

  <!-- link map scripts and css -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

  <!-- link marker clustering css and script -->
  <link rel="stylesheet" href="../../Leaflet.markercluster-1.4.1/dist/MarkerCluster.css" />
  <link rel="stylesheet" href="../../Leaflet.markercluster-1.4.1/dist/MarkerCluster.Default.css" />
  <script src="../../Leaflet.markercluster-1.4.1/dist/leaflet.markercluster-src.js"></script>
  <script src="../../Leaflet.markercluster-1.4.1/src/MarkerCluster.js"></script>

  <!-- link alert script  -->
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

  <!-- icon -->
  <link rel="icon" type="image/x-icon" href="../../images/icon.ico">

  <style>
    /* Override jQuery Modal Plugin Styles */
    .modal {
      background-color: #1F2937 !important; /* Tailwind bg-gray-800 */
      color: #F9FAFB !important; /* Tailwind text-white */
    }

    .modal a.close-modal {
      color: #F9FAFB !important; /* Ensure close button is visible */
    }

    .max-width-height-900 {
      max-width: 900px;
      max-height: 900px;
    }

        /* Ensure the modal is centered and within the viewport */
    .custom-modal {
      position: fixed;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 30%;
      max-height: 30%;
      overflow-y: auto;
    }

  
</style>
  </style>

  <?php 
			session_start();
			if (!isset( $_SESSION['user_id'] ) && !isset( $_SESSION['user_type'])) {
				header("Location:../../index.php");
			}
      else if ($_SESSION['user_type'] == "citizen") {
				header("Location:../citizen/index.php");
      }
			else if($_SESSION['user_type'] == "admin"){
				header("Location:../admin/index.php");
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
          <a href="index.php" class="text-yellow-600 hover:text-yellow-400 font-bold block">Map</a>
        </li>
        <li>
          <a id="show-vehicle-warehouse" class="text-yellow-600 hover:text-yellow-400 font-bold block cursor-pointer"> Cargo</a>
        </li>
        <li>
          <a id="manage-tasks" class="text-yellow-600 hover:text-yellow-400 font-bold block cursor-pointer">Manage <br>Tasks</a>
        </li>
        <li>
          <a onclick="logout()" href="#" class="text-yellow-600 hover:text-yellow-400 font-bold block">Logout</a>
        </li>
      </ul>
    </nav>
  </header>

  <!-- Main Content -->
  <div class="flex-1 p-6 overflow-y-auto ml-64 relative">
    <div class="wrapper p-6">
      <div class="map-wrapper mb-4">
        <div id="map" class="h-96 w-full rounded-lg shadow-lg"></div>
      </div>

      <div class="switches grid grid-cols-2 gap-4">
        <div class="map-toggle-container flex items-center bg-gray-200 rounded max-w-max">
          <h3 class="text-yellow-600 mr-2">My location</h3>
          <img src="../../images/markers/marker_rescuer.png" class="w-6 h-6 mr-2">
          <label class="switch">
            <input id="rescuers-toggle" type="checkbox" checked />
            <div></div>
          </label>
        </div>

        <div class="map-toggle-container flex items-center bg-gray-200 rounded max-w-max">
          <h3 class="text-yellow-600 mr-2">Picked up<br>Demands</h3>
          <img src="../../images/markers/marker_civilian_demand.png" class="w-6 h-6 mr-2">
          <label class="switch">
            <input id="picked-demands-toggle" type="checkbox" checked />
            <div></div>
          </label>
        </div>

        <div class="map-toggle-container flex items-center bg-gray-200 rounded max-w-max">
          <h3 class="text-yellow-600 mr-2">Demands</h3>
          <img src="../../images/markers/marker_civilian_no_demand.png" class="w-6 h-6 mr-2">
          <label class="switch">
            <input id="demands-toggle" type="checkbox" checked />
            <div></div>
          </label>
        </div>

        <div class="map-toggle-container flex items-center bg-gray-200 rounded max-w-max">
          <h3 class="text-yellow-600 mr-2">Picked up<br>Offers</h3>
          <img src="../../images/markers/marker_civilian_offer.png" class="w-6 h-6 mr-2">
          <label class="switch">
            <input id="picked-offers-toggle" type="checkbox" checked />
            <div></div>
          </label>
        </div>

        <div class="map-toggle-container flex items-center bg-gray-200 rounded max-w-max">
          <h3 class="text-yellow-600 mr-2">Offers</h3>
          <img src="../../images/markers/marker_civilian_no_offer.png" class="w-6 h-6 mr-2">
          <label class="switch">
            <input id="offers-toggle" type="checkbox" checked />
            <div></div>
          </label>
        </div>

        <div class="map-toggle-container flex items-center bg-gray-200 rounded max-w-max">
          <h3 class="text-yellow-600 mr-2">Offer<br>Lines</h3>
          <label class="switch">
            <input id="offer-lines-toggle" type="checkbox" checked />
            <div></div>
          </label>
        </div>

        <div class="map-toggle-container flex items-center bg-gray-200 rounded max-w-max">
          <h3 class="text-yellow-600 mr-2">Demand<br>Lines</h3>
          <label class="switch">
            <input id="demand-lines-toggle" type="checkbox" checked />
            <div></div>
          </label>
        </div>

        <div id="vehicle-modal" class="modal custom-modal bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-xl mx-auto fixed inset-0 z-50 flex items-center justify-center" style="background-color: #1F2937 !important; color: #F9FAFB !important;">
          <div class="modal-wrapper space-y-4">
            <table class="fixed_headers vehicle w-full text-left">
              <thead class="bg-gray-700 text-yellow-600">
                <tr>
                  <th class="py-2 px-4">Name</th>
                  <th class="py-2 px-4">Vehicle Quantity</th>
                </tr>
              </thead>
              <tbody id="vehicle-products" class="bg-gray-800"></tbody>
            </table>
          </div>
        </div>

        <div id="base-modal" class="modal custom-modal bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-xl mx-auto fixed inset-0 z-50 flex items-center justify-center" style="background-color: #1F2937 !important; color: #F9FAFB !important;">
          <div class="modal-wrapper space-y-4">
            <button id="remove-from-vehicle-btn" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Unload</button>
            <table class="fixed_headers w-full text-left">
              <thead class="bg-gray-700 text-yellow-600">
                <tr>
                  <th class="py-2 px-4">Name</th>
                  <th class="py-2 px-4">Base Quantity</th>
                  <th class="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody id="base-products" class="bg-gray-800"></tbody>
            </table>
          </div>
        </div>

        <div id="product-modal" class="modal custom-modal bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-xl mx-auto fixed inset-0 z-50 flex items-center justify-center" style="background-color: #1F2937 !important; color: #F9FAFB !important;">
          <div class="modal-wrapper space-y-4">
            <div id="product-name" class="product-name text-lg font-bold mb-4">Name</div>
            <input id="product-quantity" type="number" min="1" class="bg-gray-700 text-white rounded p-2 w-full mb-4">
            <button id="add-prod-btn" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Add to Vehicle</button>
          </div>
        </div>

        <div id="tasks-modal" class="modal custom-modal bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-xl mx-auto fixed inset-0 z-50 flex items-center justify-center" style="background-color: #1F2937 !important; color: #F9FAFB !important;">
          <div class="modal-wrapper space-y-4">
            <table class="fixed_headers tasks w-full text-left">
              <thead class="bg-gray-700 text-yellow-600">
                <tr>
                  <th class="py-2 px-4">ID</th>
                  <th class="py-2 px-4">Type</th>
                  <th class="py-2 px-4">Product</th>
                  <th class="py-2 px-4">Quantity</th>
                  <th class="py-2 px-4">Created</th>
                  <th class="py-2 px-4">Status</th>
                  <th class="py-2 px-4">Name</th>
                  <th class="py-2 px-4">Phone</th>
                </tr>
              </thead>
              <tbody id="tasks-list" class="bg-gray-800"></tbody>
            </table>
          </div>
        </div>


      </div>
    </div>
  </div>
</body>

</html>

