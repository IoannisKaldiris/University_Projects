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
    $query = "select rescuerproducts.productId as productId, quantity, name from rescuerproducts
    inner join product on rescuerproducts.productId = product.id where quantity != 0 and rescuerproducts.rescuerId = ".$_SESSION["user_id"].";";
  
    $result = $mysql_link->query($query);
    while($row = $result->fetch_assoc()){
      $data[$row["productId"]]["name"] = $row["name"];
      $data[$row["productId"]]["quantity"] = $row["quantity"];
    }
    echo json_encode($data);
		$mysql_link->close(); 
  } catch (mysqli_sql_exception $e) {
		echo "error";
		$mysql_link->close(); 
  }
?>