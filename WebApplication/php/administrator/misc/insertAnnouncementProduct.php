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

		if(isset($_POST["id"])) {
			$query = "insert into announcementProducts (id, announcementId, productId, quantity)
    	values (".$_POST["id"].", ".$_POST["announcementId"].", ".$_POST["productId"].", ".$_POST["quantity"].");";
		} else {
			$query = "insert into announcementProducts (announcementId, productId, quantity)
    	values (".$_POST["announcementId"].", ".$_POST["productId"].", ".$_POST["quantity"].");";
		}

		$mysql_link->query($query);

		echo "success";
		$mysql_link->close();
	} catch (mysqli_sql_exception $e) {
		echo "error";
		$mysql_link->close();
	}
?>