<?php
	header("Content-Type: application/json; charset=UTF-8");
	session_start();
	try{
		include_once("connect.php");

		// check if exists citizen with those credentials
		$query = "SELECT latitude, longitude FROM base";
		$result = $mysql_link->query($query);
    
	// gets the coordinates if you move the BaseLocation
    while($row = $result->fetch_assoc()){
      $data["latitude"] = $row["latitude"];
      $data["longitude"] = $row["longitude"];
    }
		
    echo json_encode($data);
		$mysql_link->close();
	} catch (mysqli_sql_exception $e) {
		$mysql_link->close();
		echo "error";
	}
?>