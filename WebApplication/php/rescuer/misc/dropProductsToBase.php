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
  
  try {
    $query = "update product
    inner join rescuerproducts on product.id = rescuerproducts.productId
    set baseQuantity = baseQuantity + rescuerproducts.quantity, rescuerproducts.quantity = 0
    where rescuerId = ".$_SESSION["user_id"].";";
    $mysql_link->query($query);

		echo "success";
		$mysql_link->close();
  } catch (mysqli_sql_exception $e) {
		echo $e;
		$mysql_link->close(); 
  }
?>