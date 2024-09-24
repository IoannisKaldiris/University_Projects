<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sidebar Layout</title>
  <!-- Tailwind CSS CDN -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
  <style>
    .sidebar {
      width: 250px;
      min-height: 100vh;
    }
  </style>
</head>
<body class="bg-gray-900 flex">

  <!-- Sidebar Header -->
  <header class="sidebar bg-gray-200 text-white fixed inset-y-0 left-0 flex flex-col p-4 rounded">
    <div class="nav-brand mb-6 flex justify-center">
      <a href="index.php">
        <img src="../../images/icon.png" alt="Icon" class="w-20 h-20">
      </a>
    </div>
    <nav class="flex-1">
      <ul class="space-y-4">
        <li>
        <a href="announcements.php" class="text-yellow-600 hover:text-yellow-400 font-bold">Create an announcement</a>
        </li>
        <li>
          <a href="index.php" class="text-yellow-600 hover:text-yellow-400 font-bold"> Base </a>
        </li>
        <li>
          <a href="map.php" class="text-yellow-600 hover:text-yellow-400 font-bold"> Map </a>
        </li>
        <li>
          <a href="newRescuer.php" class="text-yellow-600 hover:text-yellow-400 font-bold">Create new rescuer </a>
        </li>
        <li>
          <a href="graphs.php" class="text-yellow-600 hover:text-yellow-400 font-bold block">Graphs</a>
        </li>
        <li>
          <a onclick="logout()" href="#" class="text-yellow-600 hover:text-yellow-400 font-bold"> Logout </a>
        </li>
      </ul>
    </nav>
  </header>

</body>
</html>
