<?php
session_start();
include_once("../../../connect.php");

if (!isset($_SESSION['user_id']) || $_SESSION['user_type'] != 'admin') {
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

$period = isset($_GET['period']) ? intval($_GET['period']) : 7;

$result = [
    'labels' => [],
    'newRequests' => [],
    'newOffers' => [],
    'processedRequests' => [],
    'processedOffers' => [],
];

// Fetch data from the database
$query = "
    SELECT DATE(created) as date, 
           SUM(type = 'demand' AND completed IS NULL) as newRequests, 
           SUM(type = 'offer' AND completed IS NULL) as newOffers, 
           SUM(type = 'demand' AND completed IS NOT NULL) as processedRequests, 
           SUM(type = 'offer' AND completed IS NOT NULL) as processedOffers
    FROM (
        SELECT created, 'demand' as type, completed FROM demand
        UNION ALL
        SELECT created, 'offer' as type, completed FROM offer
    ) as combined
    WHERE created >= CURDATE() - INTERVAL $period DAY
    GROUP BY DATE(created)
    ORDER BY DATE(created)
";

$result_query = $mysql_link->query($query);

while ($row = $result_query->fetch_assoc()) {
    $result['labels'][] = $row['date'];
    $result['newRequests'][] = $row['newRequests'] ? $row['newRequests'] : 0;
    $result['newOffers'][] = $row['newOffers'] ? $row['newOffers'] : 0;
    $result['processedRequests'][] = $row['processedRequests'] ? $row['processedRequests'] : 0;
    $result['processedOffers'][] = $row['processedOffers'] ? $row['processedOffers'] : 0;
}

echo json_encode($result);
?>
