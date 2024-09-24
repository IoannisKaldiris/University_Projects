<?php
  session_start();
  if (!isset( $_SESSION['user_id'] ) && !isset( $_SESSION['user_type'])) {
		header("Location:../../../index.php");
		return;
	}
	else if($_SESSION['user_type'] != "citizen"){
		header("Location:../../index.php");
		return;
	}
  include_once("../../../connect.php");
	header("Content-Type: application/json; charset=UTF-8");
  
  try {
    $data = array();

    $query = "select offer.id as offerId, product.name, productId, quantity, created, completed, canceled, picked
    from offer inner join product on offer.productId = product.id
    where citizenId = ".$_SESSION["user_id"].";";
    $result = $mysql_link->query($query);
    while($row = $result->fetch_assoc()){
      $data["offers"][$row["offerId"]]["productName"] = $row["name"];
      $data["offers"][$row["offerId"]]["productId"] = $row["productId"];
      $data["offers"][$row["offerId"]]["quantity"] = $row["quantity"];
      $data["offers"][$row["offerId"]]["created"] = $row["created"];
      $data["offers"][$row["offerId"]]["completed"] = $row["completed"];
      $data["offers"][$row["offerId"]]["canceled"] = $row["canceled"];
      $data["offers"][$row["offerId"]]["picked"] = $row["picked"];
    }

    $query = "select demand.id as demandId, product.name, productId, demand.peopleConcerns, created, completed, canceled, picked
    from demand inner join product on demand.productId = product.id
    where citizenId = ".$_SESSION["user_id"].";";
    $result = $mysql_link->query($query);
    while($row = $result->fetch_assoc()){
      $data["demands"][$row["demandId"]]["productName"] = $row["name"];
      $data["demands"][$row["demandId"]]["productId"] = $row["productId"];
      $data["demands"][$row["demandId"]]["peopleConcerns"] = $row["peopleConcerns"];
      $data["demands"][$row["demandId"]]["created"] = $row["created"];
      $data["demands"][$row["demandId"]]["completed"] = $row["completed"];
      $data["demands"][$row["demandId"]]["canceled"] = $row["canceled"];
      $data["demands"][$row["demandId"]]["picked"] = $row["picked"];
    }
    
    echo json_encode($data);
		$mysql_link->close(); 
  } catch (mysqli_sql_exception $e) {
		echo "error";
		$mysql_link->close(); 
  }
?>