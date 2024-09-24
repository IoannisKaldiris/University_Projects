<?php
  session_start();
  if (!isset( $_SESSION['user_id'] ) && !isset( $_SESSION['user_type'])) {
		header("Location:../../index.php");
		return;
	}
	else if($_SESSION['user_type'] != "admin"){
		header("Location:../../index.php");
		return;
	}
	header("Content-Type: application/json; charset=UTF-8");
  include_once("../../../connect.php");
  
  $query = "select distinct category from product;";
  $result = $mysql_link->query($query);
  
  $data = array();
  $data["categories"] = array();
  while($row = $result->fetch_assoc()){
    array_push($data["categories"], $row["category"]);
  }

  // check if exists citizen with those credentials
  if(isset($_GET["category"])) {
    $query = "select id, name, category from product where lower(category) = '".$_GET["category"]."';";
  } else if(isset($_GET["productName"])) {
    $query = "select id, name, category from product where lower(name) like '%".$_GET["productName"]."%';";
  } else {
    $query = "select id, name, category from product;";
  }
  
  $result = $mysql_link->query($query);
  while($row = $result->fetch_assoc()){
    $data["products"][$row["id"]]["id"] = $row["id"];
    $data["products"][$row["id"]]["name"] = $row["name"];
    $data["products"][$row["id"]]["category"] = $row["category"];
  }
  
  echo json_encode($data);
?>