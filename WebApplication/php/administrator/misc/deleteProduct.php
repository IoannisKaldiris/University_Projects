<?php
	try{
		include_once("../../../connect.php");

   	    $deleteProduct = "delete from product where id = ".$_POST["productId"].";";
		$mysql_link->query($deleteProduct);

		echo "success";
		$mysql_link->close();
	} catch (mysqli_sql_exception $e) {
		echo "error";
	}
?>