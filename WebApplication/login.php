<?php
	session_start();
	try{
		include_once("connect.php");
		$userFoundFlag = false;

		// check if exists citizen with those credentials
		$query = "SELECT id, username FROM citizen WHERE username = '".$_POST["username"]."' AND password = '".$_POST["password"]."'";
		$result = $mysql_link->query($query);
		if (mysqli_num_rows($result) == 1) { 
			$row = $result->fetch_array();
			$_SESSION["user_id"] = $row["id"];
			$_SESSION["username"] = $row["username"];
			$_SESSION["user_type"] = "citizen";
			echo json_encode(["user_type" => $_SESSION["user_type"], "user_id" => $_SESSION["user_id"]]);
			return;
		}
		
		// check if exists rescuer with those credentials
		$query = "SELECT id, username FROM rescuer WHERE username = '".$_POST["username"]."' AND password = '".$_POST["password"]."'";
		$result = $mysql_link->query($query);
		if (mysqli_num_rows($result) == 1) { 
			$row = $result->fetch_array();
			$_SESSION["user_id"] = $row["id"];
			$_SESSION["username"] = $row["username"];
			$_SESSION["user_type"] = "rescuer";
			echo json_encode(["user_type" => $_SESSION["user_type"], "user_id" => $_SESSION["user_id"]]);
			return;
		}

		// check if exists admin with those credentials
		$query = "SELECT id, username FROM admin WHERE username = '".$_POST["username"]."' AND password = '".$_POST["password"]."'";
		$result = $mysql_link->query($query);
		if (mysqli_num_rows($result) == 1) { 
			$row = $result->fetch_array();
			$_SESSION["user_id"] = $row["id"];
			$_SESSION["username"] = $row["username"];
			$_SESSION["user_type"] = "admin";
			echo json_encode(["user_type" => $_SESSION["user_type"], "user_id" => $_SESSION["user_id"]]);
			return;
		}
		
		// if none of the above exists the user is not in the system
		echo json_encode(["user_type" => 0]);
		$mysql_link->close();
	} catch (mysqli_sql_exception $e) {
		echo json_encode(["error" => "error"]);
	}
?>
