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
  include_once("../../../connect.php");
  
  try {
    $query = "select id from detail where detailName = '".$_GET["detailName"]."' and detailValue = '".$_GET["detailValue"]."';";
    $result = $mysql_link->query($query);
    $result = $result->fetch_assoc();

    echo $result["id"];
		$mysql_link->close(); 
  } catch (mysqli_sql_exception $e) {
		echo "error";
		$mysql_link->close(); 
  }
?>