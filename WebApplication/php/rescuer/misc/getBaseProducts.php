<?php
  session_start();
  if (!isset( $_SESSION['user_id'] ) && !isset( $_SESSION['user_type'])) {
		header("Location:../../../index.php");
		return;
	}
	else if($_SESSION['user_type'] != "rescuer"){
		header("Location:../../index.php");
		return;
	}
  include_once("../../../connect.php");
	header("Content-Type: application/json; charset=UTF-8");
  
  try {
    $data = array();
    $query = "select id, name, ifnull(baseQuantity, 0) as baseQuantity from product;";
  
    $result = $mysql_link->query($query);
    while($row = $result->fetch_assoc()){
      $data[$row["id"]]["name"] = $row["name"];
      $data[$row["id"]]["baseQuantity"] = $row["baseQuantity"];
    }
    echo json_encode($data);
		$mysql_link->close(); 
  } catch (mysqli_sql_exception $e) {
		echo "error";
		$mysql_link->close(); 
  }
?>