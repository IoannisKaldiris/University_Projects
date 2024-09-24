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

    $query = "select announcement.id, created, productId, quantity, name
    from announcement
    inner join announcementproducts on announcement.id = announcementproducts.announcementId
    inner join product on announcementproducts.productId = product.id;";
    $result = $mysql_link->query($query);
    while($row = $result->fetch_assoc()){
      $data[$row["id"]]["created"] = $row["created"];
      $data[$row["id"]]["products"][$row["productId"]]["name"] = $row["name"];
      $data[$row["id"]]["products"][$row["productId"]]["quantity"] = $row["quantity"];
    }

    echo json_encode($data);
		$mysql_link->close(); 
  } catch (mysqli_sql_exception $e) {
		echo "error";
		$mysql_link->close(); 
  }
?>