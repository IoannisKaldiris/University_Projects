<?php
	session_start();
	try{
		include_once("connect.php");

		// check if exists citizen with those credentials
		$selectViaUsernameQuery = "select username from citizen where username = '".$_POST["username"]."';";
		$result = $mysql_link->query($selectViaUsernameQuery);
		if (mysqli_num_rows($result) >= 1) { 
			echo "username error";
			return;
		}

		$query = "insert into citizen (username, password, name, phone, latitude, longitude)
    		      VALUES ('".$_POST["username"]."', '".$_POST["password"]."', '".$_POST["name"]."', '".$_POST["phone"]."', ".$_POST["userLatitude"].", ".$_POST["userLongitude"].");";
		$mysql_link->query($query);

		echo "success";
		$mysql_link->close();
	} catch (mysqli_sql_exception $e) {
		echo "error";
	}
?>