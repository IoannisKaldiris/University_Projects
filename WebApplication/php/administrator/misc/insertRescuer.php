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

		// check if there is another rescuer with the same username
		$query = "SELECT id FROM rescuer where lower(username) = lower('".$_POST["username"]."')";
		$result = $mysql_link->query($query);
		if (mysqli_num_rows($result) != 0) {
			echo 0;
			return;
		}

		if(!isset($_POST["latitude"]) || !isset($_POST["longitude"])) {
			// if latitude and longitude are not set then we pass (by default) the latitude and longitude of base
			$query = "SELECT latitude, longitude FROM base";
			$result = $mysql_link->query($query);

			while($row = $result->fetch_assoc()){
				$latitude = $row["latitude"] + rand(1, 10) * 0.001;
				$longitude = $row["longitude"] + rand(1, 10) * 0.001;
			}
		} else {
			$latitude = $_POST["latitude"];
			$longitude = $_POST["longitude"];
		}

		$query = "insert into rescuer (username, password, name, phone, latitude, longitude)
    VALUES ('".$_POST["username"]."', '".$_POST["password"]."', '".$_POST["name"]."', '".$_POST["phone"]."', ".$latitude.", ".$longitude.");";
		$mysql_link->query($query);

		echo "success";
		$mysql_link->close();
	} catch (mysqli_sql_exception $e) {
		echo $e;
	}
?>