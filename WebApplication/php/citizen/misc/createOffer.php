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
  
  try {
    $query = "insert into offer (citizenId, productId, quantity, created)
    VALUES (".$_SESSION["user_id"].", ".$_POST["productId"].", ".$_POST["quantity"].", '".$_POST["date"]."');";
    $mysql_link->query($query);

    echo "success";
		$mysql_link->close(); 
  } catch (mysqli_sql_exception $e) {
		echo "error";
		$mysql_link->close(); 
  }
?>