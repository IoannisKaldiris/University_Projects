<?php
  session_start();
  if (!isset( $_SESSION['user_id'] ) && !isset( $_SESSION['user_type'])) {
		header("Location:../../index.php");
		return;
	}
	else if($_SESSION['user_type'] != "admin"){
		header("Location:../../index.php");
		return;
	}
	header("Content-Type: application/json; charset=UTF-8");
  include_once("../../../connect.php");

  $query = "select
  product.name as productName,
  ifnull(product.baseQuantity, 0) as baseQuantity,
  product.category,
  rescuerproducts.rescuerId,
  rescuerproducts.quantity as rescuerQuantity,
  rescuer.username as rescuerUsername,
  rescuer.phone as rescuerPhone
from product
left join rescuerproducts on product.id = rescuerproducts.productId
left join rescuer on rescuerproducts.rescuerId = rescuer.id
where product.id = ".$_GET["id"].";";


  $data = array();
  $result = $mysql_link->query($query);
  while($row = $result->fetch_assoc()){
    $data["name"] = $row["productName"];
    $data["baseQuantity"] = (int)$row["baseQuantity"];
    $data["category"] = $row["category"];
    $data["rescuers"][$row["rescuerId"]]["rescuerQuantity"] = $row["rescuerQuantity"];
    $data["rescuers"][$row["rescuerId"]]["rescuerUsername"] = $row["rescuerUsername"];
    $data["rescuers"][$row["rescuerId"]]["rescuerPhone"] = $row["rescuerPhone"];
  }
  
  echo json_encode($data);
?>