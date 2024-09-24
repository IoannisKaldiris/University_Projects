<?php
  session_start();
  if (!isset( $_SESSION['user_id'] ) && !isset( $_SESSION['user_type'])) {
		header("Location:../../../index.php");
		return;
	}
	else if($_SESSION['user_type'] != "citizen"){
		header("Location:../../index.php");
		return;
	}
  include_once("../../../connect.php");
	header("Content-Type: application/json; charset=UTF-8");
  
  $query = "select distinct category from product;";
  $result = $mysql_link->query($query);
  
  $data = array();
  $data["categories"] = array();
  while($row = $result->fetch_assoc()){
    array_push($data["categories"], $row["category"]);
  }

  if(isset($_GET["category"])) {
    // if we specify a category we are searching products with that category
    $query = "select id, name, category from product where lower(category) = '".$_GET["category"]."';";
  } else if(isset($_GET["productName"])) {
    // if we specify a product name we are searching products by their name
    $query = "select id, name, category from product where lower(name) like '%".$_GET["productName"]."%';";
  } else {
    // if we don't specify anything we are searching for all products and categories
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