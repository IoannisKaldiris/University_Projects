<?php
session_start();
include "../../../connect.php";

header('Content-Type: application/json');

try {
    if (!isset($_GET['offerId']) || !is_numeric($_GET['offerId'])) {
        throw new Exception("Invalid offer ID");
    }

    $offerId = intval($_GET['offerId']);

    $query = "UPDATE offer SET canceled = 1 WHERE id = ?";
    $stmt = $mysql_link->prepare($query);

    if ($stmt === false) {
        throw new Exception("Error preparing statement: " . $mysql_link->error);
    }

    $stmt->bind_param("i", $offerId);

    if (!$stmt->execute()) {
        throw new Exception("Error executing statement: " . $stmt->error);
    }

    echo json_encode(["status" => "success"]);
    $stmt->close();
    $mysql_link->close();
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    $mysql_link->close();
}
?>
