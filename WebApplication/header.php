<header class="header">
  <img src="../images/icon.png">
  <ul class="menu">
    <?php
      if($_SESSION['user_type'] == "civilian") {
        // civilian header
        echo '<li><a href="requests.php" class="';
        if(basename($_SERVER['PHP_SELF']) == "requests.php") echo 'active'; else '';
        echo '">Requests</a></li>';

        echo '<li><a href="announcements.php" class="';
        if(basename($_SERVER['PHP_SELF']) == "announcements.php") echo 'active'; else '';
        echo '">Announcements</a></li>';
      } else if ($_SESSION['user_type'] == "rescuer") {
        // rescuer header
        echo '<li><a href="map.php" class="';
        if(basename($_SERVER['PHP_SELF']) == "map.php") echo 'active'; else '';
        echo '">Μap</a></li>';

        echo '<li><a onClick="toggleCargoModal()">Cargo</a></li>';

      } else if ($_SESSION['user_type'] == "admin") {
        // admin header
        echo '<li><a href="warehouse.php" class="';
        if(basename($_SERVER['PHP_SELF']) == "warehouse.php") echo 'active'; else '';
        echo '">Warehouse</a></li>';
        
        echo '<li><a href="products.php" class="';
        if(basename($_SERVER['PHP_SELF']) == "products.php") echo 'active'; else '';
        echo '">Quantities</a></li>';

        echo '<li><a href="map.php" class="';
        if(basename($_SERVER['PHP_SELF']) == "map.php") echo 'active'; else '';
        echo '">Map</a></li>';

        echo '<li><a href="account.php" class="';
        if(basename($_SERVER['PHP_SELF']) == "account.php") echo 'active'; else '';
        echo '">Rescuer</a></li>';

        echo '<li><a href="announcement.php" class="';
        if(basename($_SERVER['PHP_SELF']) == "announcement.php") echo 'active'; else '';
        echo '">Announcement</a></li>';

      }
    ?>

  </ul>
  <button name='logout' onclick="systemlogout()" id='logout'>Logout</button>
</header>