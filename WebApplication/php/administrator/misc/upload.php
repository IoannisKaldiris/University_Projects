<?php
include_once("../../../connect.php");

function respond($message) {
    echo json_encode(['message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond('Invalid request method.');
}

// Get the JSON data from the POST request
$json = file_get_contents('php://input');
if (!$json) {
    respond('No JSON data received.');
}

$data = json_decode($json, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    respond('Invalid JSON data.');
}

mysqli_begin_transaction($mysql_link);

try {
    foreach ($data as $item) {
        $id = mysqli_real_escape_string($mysql_link, $item['id']);
        $name = mysqli_real_escape_string($mysql_link, $item['name']);
        $baseQuantity = mysqli_real_escape_string($mysql_link, $item['baseQuantity']);
        $category = mysqli_real_escape_string($mysql_link, $item['category']);

        $insertQuery = "
            INSERT INTO product (id, name, baseQuantity, category)
            VALUES ('$id', '$name', '$baseQuantity', '$category')
            ON DUPLICATE KEY UPDATE 
            name='$name', baseQuantity='$baseQuantity', category='$category'";

        if (!mysqli_query($mysql_link, $insertQuery)) {
            throw new Exception("Error inserting or updating products: " . mysqli_error($mysql_link));
        }
    }

    mysqli_commit($mysql_link);
    respond('success');
} catch (Exception $e) {
    mysqli_rollback($mysql_link);
    respond('Error: ' . $e->getMessage());
}
?>
