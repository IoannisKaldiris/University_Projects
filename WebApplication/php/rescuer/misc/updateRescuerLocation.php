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
    $query = "update rescuer set latitude = ".$_POST["latitude"].", longitude = ".$_POST["longitude"]." where id = ".$_SESSION['user_id'].";";
    $result = $mysql_link->query($query);

		echo "success";
		$mysql_link->close();
  } catch (mysqli_sql_exception $e) {
		echo "error";
		$mysql_link->close(); 
  }
?>