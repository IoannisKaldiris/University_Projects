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

  $pickedDemands = "select
    demand.id as demandId, demand.citizenId as citizenId, demand.rescuerId as rescuerId, demand.productId, demand.peopleConcerns,
    demand.quantity, demand.created, demand.completed, demand.canceled, demand.picked,
    product.name as productName, product.category, ifnull(product.baseQuantity, 0) as baseQuantity,
    citizen.name as citizenName, citizen.phone as citizenPhone, citizen.latitude as citizenLatitude, citizen.longitude as citizenLongitude,
    rescuer.id, rescuer.name as rescuerName, rescuer.phone as rescuerPhone, rescuer.latitude as rescuerLatitude, rescuer.longitude as rescuerLongitude
  from demand
  inner join product on demand.productId = product.id
  inner join citizen on demand.citizenId = citizen.id
  left join rescuer on demand.rescuerId = rescuer.id
  where canceled != true and completed is null and demand.rescuerId is not null;";

  $demands = "select
    demand.id as demandId, demand.citizenId as citizenId, demand.rescuerId as rescuerId, demand.productId, demand.peopleConcerns,
    demand.quantity, demand.created, demand.completed, demand.canceled, demand.picked,
    product.name as productName, product.category, ifnull(product.baseQuantity, 0) as baseQuantity,
    citizen.name as citizenName, citizen.phone as citizenPhone, citizen.latitude as citizenLatitude, citizen.longitude as citizenLongitude,
    rescuer.id, rescuer.name as rescuerName, rescuer.phone as rescuerPhone, rescuer.latitude as rescuerLatitude, rescuer.longitude as rescuerLongitude
  from demand
  inner join product on demand.productId = product.id
  inner join citizen on demand.citizenId = citizen.id
  left join rescuer on demand.rescuerId = rescuer.id
  where canceled != true and completed is null and demand.rescuerId is null;";

  $pickedOffers = "select
    offer.id as offerId, offer.citizenId as citizenId, offer.rescuerId as rescuerId, offer.productId,
    offer.quantity, offer.created, offer.completed, offer.canceled, offer.picked,
    product.name as productName, product.category, ifnull(product.baseQuantity, 0) as baseQuantity,
    citizen.name as citizenName, citizen.phone as citizenPhone, citizen.latitude as citizenLatitude, citizen.longitude as citizenLongitude,
    rescuer.id, rescuer.name as rescuerName, rescuer.phone as rescuerPhone, rescuer.latitude as rescuerLatitude, rescuer.longitude as rescuerLongitude
  from offer
  inner join product on offer.productId = product.id
  inner join citizen on offer.citizenId = citizen.id
  left join rescuer on offer.rescuerId = rescuer.id
  where canceled != true and completed is null and offer.rescuerId is not null;";

  $offers = "select
    offer.id as offerId, offer.citizenId as citizenId, offer.rescuerId as rescuerId, offer.productId,
    offer.quantity, offer.created, offer.completed, offer.canceled, offer.picked,
    product.name as productName, product.category, ifnull(product.baseQuantity, 0) as baseQuantity,
    citizen.name as citizenName, citizen.phone as citizenPhone, citizen.latitude as citizenLatitude, citizen.longitude as citizenLongitude,
    rescuer.id, rescuer.name as rescuerName, rescuer.phone as rescuerPhone, rescuer.latitude as rescuerLatitude, rescuer.longitude as rescuerLongitude
  from offer
  inner join product on offer.productId = product.id
  inner join citizen on offer.citizenId = citizen.id
  left join rescuer on offer.rescuerId = rescuer.id
  where canceled != true and completed is null and offer.rescuerId is null;";

  $offerLines = "select
    offer.id,
    citizen.latitude as citizenLatitude, citizen.longitude as citizenLongitude,
    rescuer.latitude as rescuerLatitude, rescuer.longitude as rescuerLongitude
  from offer
  inner join citizen on offer.citizenId = citizen.id
  left join rescuer on offer.rescuerId = rescuer.id
  where canceled != true and completed is null;";

  $demandLines = "select
    demand.id,
    citizen.latitude as citizenLatitude, citizen.longitude as citizenLongitude,
    rescuer.latitude as rescuerLatitude, rescuer.longitude as rescuerLongitude
  from demand
  inner join citizen on demand.citizenId = citizen.id
  left join rescuer on demand.rescuerId = rescuer.id
  where canceled != true and completed is null;";

  $rescuers = "select rescuer.id, username, rescuer.name, phone, latitude, longitude, product.name as prodName, rescuerproducts.quantity, product.id as prodId from rescuer
        left join rescuerproducts on rescuerproducts.rescuerId = rescuer.id
        left join product on rescuerproducts.productId = product.id;";

  $baseLocation = "select latitude, longitude from base;";
  

  try{
    $data = array();
    
    $result = $mysql_link->query($baseLocation);
    while($row = $result->fetch_assoc()){
      $data["baseLocation"]["latitude"] = $row["latitude"];
      $data["baseLocation"]["Longitude"] = $row["longitude"];
    }

    $result = $mysql_link->query($rescuers);
    while($row = $result->fetch_assoc()){
      $data["rescuers"][$row["id"]]["username"] = $row["username"];
      $data["rescuers"][$row["id"]]["name"] = $row["name"];
      $data["rescuers"][$row["id"]]["phone"] = $row["phone"];
      $data["rescuers"][$row["id"]]["latitude"] = $row["latitude"];
      $data["rescuers"][$row["id"]]["longitude"] = $row["longitude"];
      $data["rescuers"][$row["id"]]["products"][$row["prodId"]]["name"] = $row["prodName"];
      $data["rescuers"][$row["id"]]["products"][$row["prodId"]]["quantity"] = $row["quantity"];
    }
    
    $result = $mysql_link->query($demands);
    while($row = $result->fetch_assoc()){
      $data["demands"][$row["demandId"]]["citizenId"] = $row["citizenId"];
      $data["demands"][$row["demandId"]]["rescuerId"] = $row["rescuerId"];
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
      $data["demands"][$row["demandId"]]["citizenLatitude"] = $row["citizenLatitude"];
      $data["demands"][$row["demandId"]]["citizenLongitude"] = $row["citizenLongitude"];
      $data["demands"][$row["demandId"]]["rescuerName"] = $row["rescuerName"];
      $data["demands"][$row["demandId"]]["rescuerPhone"] = $row["rescuerPhone"];
      $data["demands"][$row["demandId"]]["rescuerLatitude"] = $row["rescuerLatitude"];
      $data["demands"][$row["demandId"]]["rescuerLongitude"] = $row["rescuerLongitude"];
      $data["demands"][$row["demandId"]]["rescuerLongitude"] = $row["rescuerLongitude"];
    }

    $result = $mysql_link->query($pickedDemands);
    while($row = $result->fetch_assoc()){
      $data["pickedDemands"][$row["demandId"]]["citizenId"] = $row["citizenId"];
      $data["pickedDemands"][$row["demandId"]]["rescuerId"] = $row["rescuerId"];
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
      $data["pickedDemands"][$row["demandId"]]["citizenLatitude"] = $row["citizenLatitude"];
      $data["pickedDemands"][$row["demandId"]]["citizenLongitude"] = $row["citizenLongitude"];
      $data["pickedDemands"][$row["demandId"]]["rescuerName"] = $row["rescuerName"];
      $data["pickedDemands"][$row["demandId"]]["rescuerPhone"] = $row["rescuerPhone"];
      $data["pickedDemands"][$row["demandId"]]["rescuerLatitude"] = $row["rescuerLatitude"];
      $data["pickedDemands"][$row["demandId"]]["rescuerLongitude"] = $row["rescuerLongitude"];
      $data["pickedDemands"][$row["demandId"]]["rescuerLongitude"] = $row["rescuerLongitude"];
    }

    $result = $mysql_link->query($offers);
    while($row = $result->fetch_assoc()){
      $data["offers"][$row["offerId"]]["citizenId"] = $row["citizenId"];
      $data["offers"][$row["offerId"]]["rescuerId"] = $row["rescuerId"];
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
      $data["offers"][$row["offerId"]]["citizenLatitude"] = $row["citizenLatitude"];
      $data["offers"][$row["offerId"]]["citizenLongitude"] = $row["citizenLongitude"];
      $data["offers"][$row["offerId"]]["rescuerName"] = $row["rescuerName"];
      $data["offers"][$row["offerId"]]["rescuerPhone"] = $row["rescuerPhone"];
      $data["offers"][$row["offerId"]]["rescuerLatitude"] = $row["rescuerLatitude"];
      $data["offers"][$row["offerId"]]["rescuerLongitude"] = $row["rescuerLongitude"];
    }

    $result = $mysql_link->query($pickedOffers);
    while($row = $result->fetch_assoc()){
      $data["pickedOffers"][$row["offerId"]]["citizenId"] = $row["citizenId"];
      $data["pickedOffers"][$row["offerId"]]["rescuerId"] = $row["rescuerId"];
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
      $data["pickedOffers"][$row["offerId"]]["citizenLatitude"] = $row["citizenLatitude"];
      $data["pickedOffers"][$row["offerId"]]["citizenLongitude"] = $row["citizenLongitude"];
      $data["pickedOffers"][$row["offerId"]]["rescuerName"] = $row["rescuerName"];
      $data["pickedOffers"][$row["offerId"]]["rescuerPhone"] = $row["rescuerPhone"];
      $data["pickedOffers"][$row["offerId"]]["rescuerLatitude"] = $row["rescuerLatitude"];
      $data["pickedOffers"][$row["offerId"]]["rescuerLongitude"] = $row["rescuerLongitude"];
    }

    $result = $mysql_link->query($offerLines);
    while($row = $result->fetch_assoc()){
      $data["offerLines"][$row["id"]]["citizenLatitude"] = $row["citizenLatitude"];
      $data["offerLines"][$row["id"]]["citizenLongitude"] = $row["citizenLongitude"];
      $data["offerLines"][$row["id"]]["rescuerLatitude"] = $row["rescuerLatitude"];
      $data["offerLines"][$row["id"]]["rescuerLongitude"] = $row["rescuerLongitude"];
    }

    $result = $mysql_link->query($demandLines);
    while($row = $result->fetch_assoc()){
      $data["demandLines"][$row["id"]]["citizenLatitude"] = $row["citizenLatitude"];
      $data["demandLines"][$row["id"]]["citizenLongitude"] = $row["citizenLongitude"];
      $data["demandLines"][$row["id"]]["rescuerLatitude"] = $row["rescuerLatitude"];
      $data["demandLines"][$row["id"]]["rescuerLongitude"] = $row["rescuerLongitude"];
    }

    echo json_encode($data);
  } catch (mysqli_sql_exception $e) {
    echo $e;
  }
?>