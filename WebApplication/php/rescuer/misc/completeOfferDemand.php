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
    if($_POST["type"] == "offer") {
      // if type is offer then we need to add product into rescuer's vehicle
      $query = "insert into rescuerproducts(productId, rescuerId, quantity)
      values (
        (select productId from offer where id = ".$_POST["id"]."), 
        (select rescuerId from offer where id = ".$_POST["id"]."), 
        (select quantity from offer where id = ".$_POST["id"].")
      )
      on duplicate key update quantity = quantity + values(quantity);";
  
      $mysql_link->query($query);
    } else if ($_POST["type"] == "demand") {
      // check if rescuer has the wanted product quantity in vehicle
      $query = "select ifnull(
        (select quantity from rescuerproducts where rescuerId = ".$_SESSION["user_id"]." and productId = 
          (
            select productId from demand where id = ".$_POST["id"]." limit 1
          ) limit 1), 
        0) as quantity;";
      $result = $mysql_link->query($query);
      $result = $result->fetch_assoc();
      $vehicleQuantity = $result["quantity"];

      $query = "select quantity from demand where id = ".$_POST["id"].";";
      $result = $mysql_link->query($query);
      $result = $result->fetch_assoc();
      $taskQuantity = $result["quantity"];

      if($taskQuantity > $vehicleQuantity) {
        echo 0;
        return;
      }

      // remove product from rescuer's vehicle
      $query = "update rescuerproducts set quantity = quantity - (select quantity from demand where id = ".$_POST["id"].")
      where rescuerId = ".$_SESSION["user_id"]." and productId = (select productId from demand where id = ".$_POST["id"].");";
  
      $mysql_link->query($query);
    }

    // finally update task completed date
    $query = "update ".$_POST["type"]." set completed = '".$_POST["date"]."' where id = ".$_POST["id"].";";
    $mysql_link->query($query);

		echo "success";
		$mysql_link->close();
  } catch (mysqli_sql_exception $e) {
		echo $e;
		$mysql_link->close(); 
  }
?>