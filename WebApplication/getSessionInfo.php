<?php
session_start();

if (isset($_SESSION['user_id']) && isset($_SESSION['username']) && isset($_SESSION['user_type'])) {
    $response = [
        'user_id' => $_SESSION['user_id'],
        'username' => $_SESSION['username'],
        'user_type' => $_SESSION['user_type']
    ];
    echo json_encode($response);
} else {
    echo json_encode(['error' => 'User not logged in']);
}
?>
