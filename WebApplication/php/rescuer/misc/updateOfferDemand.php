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

    if($_POST["toDelete"] == false) {
      // rescuer wants to pick up this task 
      $user_id = $_SESSION['user_id'];

      // we have to check if he already has 4 tasks picked
      $result = $mysql_link->query("select count(*) as counter from offer where rescuerId = ".$user_id."  and offer.completed is NULL
                                    union all
                                    select count(*) as counter from demand where rescuerId = ".$user_id." and demand.completed is NULL;");
      $counter = 0;
      while($row = $result->fetch_assoc()){
        $counter = $counter + $row["counter"];
      }

      if($counter >= 4) {
        echo 0;
        return;
      }
      $query = "update ".$_POST["type"]." set rescuerId = ".$user_id.", picked = '".$_POST["date"]."' where id = ".$_POST["id"].";";

    } else {
      $user_id = "null";
      $query = "update ".$_POST["type"]." set rescuerId = ".$user_id.", picked = null where id = ".$_POST["id"].";";
    }

    $result = $mysql_link->query($query);

		echo "success";
		$mysql_link->close();
  } catch (mysqli_sql_exception $e) {
		echo $e;
		$mysql_link->close(); 
  }
?>