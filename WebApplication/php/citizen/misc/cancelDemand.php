<?php
session_start();
if (!isset($_SESSION['user_id']) && !isset($_SESSION['user_type'])) {
    header("Location:../../../index.php");
    return;
} else if ($_SESSION['user_type'] != "citizen") {
    header("Location:../../index.php");
    return;
}
include_once("../../../connect.php");

try {
    $data = array();

    $query = "UPDATE demand SET canceled = true WHERE id = " . $_GET["demandId"] . ";";
    $mysql_link->query($query);

    echo json_encode(["status" => "success"]);
    $mysql_link->close();
} catch (mysqli_sql_exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    $mysql_link->close();
}
?>
