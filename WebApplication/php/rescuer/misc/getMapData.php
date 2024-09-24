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
	header("Content-Type: application/json; charset=UTF-8");
  
  try {
    $data = array();
    // get rescuer location
    $result = $mysql_link->query("select name, username, phone, latitude, longitude from rescuer where id = ".$_SESSION["user_id"].";");
    $result = $result->fetch_assoc();
    $data["rescuerInfo"]["latitude"] = $result["latitude"];
    $data["rescuerInfo"]["longitude"] = $result["longitude"];
    $data["rescuerInfo"]["name"] = $result["name"];
    $data["rescuerInfo"]["phone"] = $result["phone"];

    // get base location
    $result = $mysql_link->query("SELECT latitude, longitude FROM base;");
    $result = $result->fetch_assoc();
    $data["baseLocation"]["latitude"] = $result["latitude"];
    $data["baseLocation"]["longitude"] = $result["longitude"];
    
    // get picked by rescuer demands
    $pickedDemands = "select
      demand.id as demandId, demand.citizenId as citizenId, demand.rescuerId as rescuerId, demand.productId, demand.peopleConcerns,
      demand.quantity, demand.created, demand.completed, demand.canceled, demand.picked,
      product.name as productName, product.category, ifnull(product.baseQuantity, 0) as baseQuantity,
      citizen.name as citizenName, citizen.phone as citizenPhone, citizen.latitude as latitude, citizen.longitude as longitude
    from demand
    inner join product on demand.productId = product.id
    inner join citizen on demand.citizenId = citizen.id
    left join rescuer on demand.rescuerId = rescuer.id
    where canceled != true and completed is null and demand.rescuerId = ".$_SESSION["user_id"].";";
  
    $result = $mysql_link->query($pickedDemands);
    while($row = $result->fetch_assoc()){
      $data["pickedDemands"][$row["demandId"]]["citizenId"] = $row["citizenId"];
      $data["pickedDemands"][$row["demandId"]]["productId"] = $row["productId"];
      $data["pickedDemands"][$row["demandId"]]["peopleConcerns"] = $row["peopleConcerns"];
      $data["pickedDemands"][$row["demandId"]]["quantity"] = $row["quantity"];
      $data["pickedDemands"][$row["demandId"]]["created"] = $row["created"];
      $data["pickedDemands"][$row["demandId"]]["completed"] = $row["completed"];
      $data["pickedDemands"][$row["demandId"]]["picked"] = $row["picked"];
      $data["pickedDemands"][$row["demandId"]]["productName"] = $row["productName"];
      $data["pickedDemands"][$row["demandId"]]["productCategory"] = $row["category"];
      $data["pickedDemands"][$row["demandId"]]["baseQuantity"] = $row["baseQuantity"];
      $data["pickedDemands"][$row["demandId"]]["citizenName"] = $row["citizenName"];
      $data["pickedDemands"][$row["demandId"]]["citizenPhone"] = $row["citizenPhone"];
      $data["pickedDemands"][$row["demandId"]]["latitude"] = $row["latitude"];
      $data["pickedDemands"][$row["demandId"]]["longitude"] = $row["longitude"];
    }
    
    // get not picked demands
    $demands = "select
      demand.id as demandId, demand.citizenId as citizenId, demand.rescuerId as rescuerId, demand.productId, demand.peopleConcerns,
      demand.quantity, demand.created, demand.completed, demand.canceled, demand.picked,
      product.name as productName, product.category, ifnull(product.baseQuantity, 0) as baseQuantity,
      citizen.name as citizenName, citizen.phone as citizenPhone, citizen.latitude as latitude, citizen.longitude as longitude
    from demand
    inner join product on demand.productId = product.id
    inner join citizen on demand.citizenId = citizen.id
    left join rescuer on demand.rescuerId = rescuer.id
    where canceled != true and completed is null and demand.rescuerId is null;";

    $result = $mysql_link->query($demands);
    while($row = $result->fetch_assoc()){
      $data["demands"][$row["demandId"]]["citizenId"] = $row["citizenId"];
      $data["demands"][$row["demandId"]]["productId"] = $row["productId"];
      $data["demands"][$row["demandId"]]["peopleConcerns"] = $row["peopleConcerns"];
      $data["demands"][$row["demandId"]]["quantity"] = $row["quantity"];
      $data["demands"][$row["demandId"]]["created"] = $row["created"];
      $data["demands"][$row["demandId"]]["completed"] = $row["completed"];
      $data["demands"][$row["demandId"]]["picked"] = $row["picked"];
      $data["demands"][$row["demandId"]]["productName"] = $row["productName"];
      $data["demands"][$row["demandId"]]["productCategory"] = $row["category"];
      $data["demands"][$row["demandId"]]["baseQuantity"] = $row["baseQuantity"];
      $data["demands"][$row["demandId"]]["citizenName"] = $row["citizenName"];
      $data["demands"][$row["demandId"]]["citizenPhone"] = $row["citizenPhone"];
      $data["demands"][$row["demandId"]]["latitude"] = $row["latitude"];
      $data["demands"][$row["demandId"]]["longitude"] = $row["longitude"];
    }

    // get picked by rescuer offers
    $pickedOffers = "select
      offer.id as offerId, offer.citizenId as citizenId, offer.rescuerId as rescuerId, offer.productId,
      offer.quantity, offer.created, offer.completed, offer.canceled, offer.picked,
      product.name as productName, product.category, ifnull(product.baseQuantity, 0) as baseQuantity,
      citizen.name as citizenName, citizen.phone as citizenPhone, citizen.latitude as latitude, citizen.longitude as longitude
    from offer
    inner join product on offer.productId = product.id
    inner join citizen on offer.citizenId = citizen.id
    left join rescuer on offer.rescuerId = rescuer.id
    where canceled != true and completed is null and offer.rescuerId = ".$_SESSION["user_id"].";";

    $result = $mysql_link->query($pickedOffers);
    while($row = $result->fetch_assoc()){
      $data["pickedOffers"][$row["offerId"]]["citizenId"] = $row["citizenId"];
      $data["pickedOffers"][$row["offerId"]]["productId"] = $row["productId"];
      $data["pickedOffers"][$row["offerId"]]["quantity"] = $row["quantity"];
      $data["pickedOffers"][$row["offerId"]]["created"] = $row["created"];
      $data["pickedOffers"][$row["offerId"]]["completed"] = $row["completed"];
      $data["pickedOffers"][$row["offerId"]]["picked"] = $row["picked"];
      $data["pickedOffers"][$row["offerId"]]["productName"] = $row["productName"];
      $data["pickedOffers"][$row["offerId"]]["productCategory"] = $row["category"];
      $data["pickedOffers"][$row["offerId"]]["baseQuantity"] = $row["baseQuantity"];
      $data["pickedOffers"][$row["offerId"]]["citizenName"] = $row["citizenName"];
      $data["pickedOffers"][$row["offerId"]]["citizenPhone"] = $row["citizenPhone"];
      $data["pickedOffers"][$row["offerId"]]["latitude"] = $row["latitude"];
      $data["pickedOffers"][$row["offerId"]]["longitude"] = $row["longitude"];
    }

    // get not picked offers
    $offers = "select
      offer.id as offerId, offer.citizenId as citizenId, offer.rescuerId as rescuerId, offer.productId,
      offer.quantity, offer.created, offer.completed, offer.canceled, offer.picked,
      product.name as productName, product.category, ifnull(product.baseQuantity, 0) as baseQuantity,
      citizen.name as citizenName, citizen.phone as citizenPhone, citizen.latitude as latitude, citizen.longitude as longitude
    from offer
    inner join product on offer.productId = product.id
    inner join citizen on offer.citizenId = citizen.id
    left join rescuer on offer.rescuerId = rescuer.id
    where canceled != true and completed is null and offer.rescuerId is null;";

    $result = $mysql_link->query($offers);
    while($row = $result->fetch_assoc()){
      $data["offers"][$row["offerId"]]["citizenId"] = $row["citizenId"];
      $data["offers"][$row["offerId"]]["productId"] = $row["productId"];
      $data["offers"][$row["offerId"]]["quantity"] = $row["quantity"];
      $data["offers"][$row["offerId"]]["created"] = $row["created"];
      $data["offers"][$row["offerId"]]["completed"] = $row["completed"];
      $data["offers"][$row["offerId"]]["picked"] = $row["picked"];
      $data["offers"][$row["offerId"]]["productName"] = $row["productName"];
      $data["offers"][$row["offerId"]]["productCategory"] = $row["category"];
      $data["offers"][$row["offerId"]]["baseQuantity"] = $row["baseQuantity"];
      $data["offers"][$row["offerId"]]["citizenName"] = $row["citizenName"];
      $data["offers"][$row["offerId"]]["citizenPhone"] = $row["citizenPhone"];
      $data["offers"][$row["offerId"]]["latitude"] = $row["latitude"];
      $data["offers"][$row["offerId"]]["longitude"] = $row["longitude"];
    }

    // get picked by rescuer offer lines
    $offerLines = "select
      offer.id,
      citizen.latitude as citizenLatitude, citizen.longitude as citizenLongitude,
      rescuer.latitude as rescuerLatitude, rescuer.longitude as rescuerLongitude
    from offer
    inner join citizen on offer.citizenId = citizen.id
    left join rescuer on offer.rescuerId = rescuer.id
    where canceled != true and completed is null and rescuerId = ".$_SESSION["user_id"].";";

    $result = $mysql_link->query($offerLines);
    while($row = $result->fetch_assoc()){
      $data["offerLines"][$row["id"]]["citizenLatitude"] = $row["citizenLatitude"];
      $data["offerLines"][$row["id"]]["citizenLongitude"] = $row["citizenLongitude"];
      $data["offerLines"][$row["id"]]["rescuerLatitude"] = $row["rescuerLatitude"];
      $data["offerLines"][$row["id"]]["rescuerLongitude"] = $row["rescuerLongitude"];
    }


    // get picked by rescuer demand lines
    $demandLines = "select
      demand.id,
      citizen.latitude as citizenLatitude, citizen.longitude as citizenLongitude,
      rescuer.latitude as rescuerLatitude, rescuer.longitude as rescuerLongitude
    from demand
    inner join citizen on demand.citizenId = citizen.id
    left join rescuer on demand.rescuerId = rescuer.id
    where canceled != true and completed is null and rescuerId = ".$_SESSION["user_id"].";";

    $result = $mysql_link->query($demandLines);
    while($row = $result->fetch_assoc()){
      $data["demandLines"][$row["id"]]["citizenLatitude"] = $row["citizenLatitude"];
      $data["demandLines"][$row["id"]]["citizenLongitude"] = $row["citizenLongitude"];
      $data["demandLines"][$row["id"]]["rescuerLatitude"] = $row["rescuerLatitude"];
      $data["demandLines"][$row["id"]]["rescuerLongitude"] = $row["rescuerLongitude"];
    }

    echo json_encode($data);
		$mysql_link->close(); 
  } catch (mysqli_sql_exception $e) {
		echo "error";
		$mysql_link->close(); 
  }
?>