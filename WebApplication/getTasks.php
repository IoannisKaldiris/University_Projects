<?php
session_start();
include_once("connect.php");

if (isset($_SESSION['user_id']) && isset($_SESSION['user_type']) && $_SESSION['user_type'] == 'rescuer') {
    $rescuer_id = $_SESSION['user_id'];
    $result = [];

    // Combined query to fetch tasks from both demands and offers tables
    $query = "
        SELECT 
            d.id, d.productId, d.quantity, d.created, d.completed, d.picked, 'demand' as type, 
            c.name, c.phone 
        FROM 
            demand d 
        JOIN 
            citizen c ON d.citizenId = c.id 
        WHERE 
            d.rescuerId = $rescuer_id
        UNION ALL
        SELECT 
            o.id, o.productId, o.quantity, o.created, o.completed, o.picked, 'offer' as type, 
            c.name, c.phone 
        FROM 
            offer o 
        JOIN 
            citizen c ON o.citizenId = c.id 
        WHERE 
            o.rescuerId = $rescuer_id;
    ";

    $result_query = $mysql_link->query($query);

    while ($row = $result_query->fetch_assoc()) {
        $result[] = $row;
    }

    echo json_encode($result);
} else {
    echo json_encode(['error' => 'User not logged in or not a rescuer']);
}
?>
