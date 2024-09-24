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

		if(isset($_POST["baseQuantity"])) {
			$query = "INSERT INTO `product` (`name`, baseQuantity, `category`) 
              VALUES('".$_POST["name"]."', ".$_POST["baseQuantity"]." , '".$_POST["category"]."');";	
		} else {
			$query = "INSERT INTO `product` (`id`, `name`, `category`) 
              VALUES(".$_POST["id"].", '".$_POST["name"]."', '".$_POST["category"]."');";
		}
		$mysql_link->query($query);

		echo "success";
		$mysql_link->close();
	} catch (mysqli_sql_exception $e) {
		echo $_POST["id"];
	}
?>