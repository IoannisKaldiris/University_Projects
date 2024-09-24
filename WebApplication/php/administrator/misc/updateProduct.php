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

		if(isset($_POST["toDelete"])) {
			$query = "delete from product where id = ".$_POST["productId"].";";
		} else {
			$query = "update product set name = '".$_POST["name"]."', baseQuantity = ".$_POST["quantity"].", category = '".$_POST["category"]."'
			where id = ".$_POST["productId"].";";
		}
    
    
		
		$mysql_link->query($query);
		echo "success";
		$mysql_link->close();
	} catch (mysqli_sql_exception $e) {
		echo "error";
	}
?>