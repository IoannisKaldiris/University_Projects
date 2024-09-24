<?php
    $mysql_link = new mysqli('localhost', 'root', '', 'hpP');

    if (mysqli_connect_error()) {
        die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error()); // The error message
    }
    $mysql_link->query ('SET CHARACTER SET utf8');
    $mysql_link->query ('SET COLLATION_CONNECTION=utf8_general_ci');
?>