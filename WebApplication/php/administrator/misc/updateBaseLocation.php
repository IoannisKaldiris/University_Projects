<?php
	session_start();
	if (!isset( $_SESSION['user_id'] ) && !isset( $_SESSION['user_type'])) {
		header("Location:../../../index.php");
    return;
	}
	else if($_SESSION['user_type'] != "admin"){
		header("Location:../../../index.php");
    return;
	}
	try{
		include_once("../../../connect.php");

    $query = "update base set latitude = ".$_POST["latitude"].", longitude = ".$_POST["longitude"].";";
		$mysql_link->query($query);

		echo "success";
		$mysql_link->close();
	} catch (mysqli_sql_exception $e) {
		echo $_POST["id"];
	}
?>