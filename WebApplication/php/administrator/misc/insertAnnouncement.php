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

		$query = "select max(id) as maxId from announcement;";
		$result = $mysql_link->query($query);
		while($row = $result->fetch_assoc()){
			// get the biggest id from announcements so we can find the next available id
			$maxId = (int)$row["maxId"];
    }
		if(!isset($maxId)) $maxId = 0;
		$id = $maxId + 1; // $id = next available id

		$query = "insert into announcement (id, created)
    values (".$id.", '".$_POST["created"]."');";
		$mysql_link->query($query);

		echo $id;
		$mysql_link->close();
	} catch (mysqli_sql_exception $e) {
		echo "error";
		$mysql_link->close();
	}
?>