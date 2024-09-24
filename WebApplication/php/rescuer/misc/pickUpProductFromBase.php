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


    $query = "update product set baseQuantity = baseQuantity - ".$_POST["quantity"]." where id = ".$_POST["productId"].";";
    $mysql_link->query($query);

    $query = "insert into rescuerproducts(productId, rescuerId, quantity) values 
    (".$_POST["productId"].", ".$_SESSION["user_id"].", ".$_POST["quantity"].") 
    on duplicate key update quantity = quantity + values(quantity);";
    $mysql_link->query($query);

		echo "success";
		$mysql_link->close();
  } catch (mysqli_sql_exception $e) {
		echo $e;
		$mysql_link->close(); 
  }
?>