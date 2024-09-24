function onMapClick(e) {
  // we don't want to do anything on map click so we just return
  // (we need it cause we initialize it on map.js)
  return;
}

let baseLatitude = null;
let baseLongitude = null;

$(document).ready(function () {
  callAjaxGetRequestFunc("../../getBaseLocation.php", onBaseLocationFound);
});

function onBaseLocationFound(data) {
  // set map view and make a get request for data for all other markers
  if (data == "error") {
    generateAlert("Error", "No connection to database. Please try again later", "error");
    return;
  }
  map.setView([data.latitude, data.longitude], 12);

  callAjaxGetRequestFunc("./misc/getMapData.php", onMapDataRetrieved);
}

function onMapDataRetrieved(data) {
  let mapLayers = new Array();
  /*
    mapLayers = [
      { layer: BaseLayer, type: "base" },
      { layer: rescuerLayer, type: "rescuer" },
      { layer: OfferLayer, type: "offer" },
      { layer: DemandLayer, type: "demand" },
      { layer: PickedOfferLayer, type: "pickedOffer" },
      { layer: PickedDemandLayer, type: "pickedDemand" },
      { layer: OfferPolyline, type: "offerPolyline" },
      { layer: DemandPolyline, type: "demandPolyline" }
    ]
  */
  for (d in data) {
    console.log(data);
    let tempLayer = new MapLayer();
    tempLayer.createMarkers(data[d], d);
    mapLayers.push({ layer: tempLayer, type: d });
  }

  // setup all switches functionality
  $("#rescuers-toggle").on("click", () => {
    if ($("#rescuers-toggle").is(":checked")) {
      map.addLayer(mapLayers.find((layer) => layer.type == "rescuers").layer.getLayer());
      return;
    }

    map.removeLayer(mapLayers.find((layer) => layer.type == "rescuers").layer.getLayer());
  });

  $("#picked-demands-toggle").on("click", () => {
    if ($("#picked-demands-toggle").is(":checked")) {
      map.addLayer(mapLayers.find((layer) => layer.type == "pickedDemands").layer.getLayer());
      return;
    }

    map.removeLayer(mapLayers.find((layer) => layer.type == "pickedDemands").layer.getLayer());
  });

  $("#demands-toggle").on("click", () => {
    if ($("#demands-toggle").is(":checked")) {
      map.addLayer(mapLayers.find((layer) => layer.type == "demands").layer.getLayer());
      return;
    }

    map.removeLayer(mapLayers.find((layer) => layer.type == "demands").layer.getLayer());
  });

  $("#picked-offers-toggle").on("click", () => {
    if ($("#picked-offers-toggle").is(":checked")) {
      map.addLayer(mapLayers.find((layer) => layer.type == "pickedOffers").layer.getLayer());
      return;
    }

    map.removeLayer(mapLayers.find((layer) => layer.type == "pickedOffers").layer.getLayer());
  });

  $("#offers-toggle").on("click", () => {
    if ($("#offers-toggle").is(":checked")) {
      map.addLayer(mapLayers.find((layer) => layer.type == "offers").layer.getLayer());
      return;
    }

    map.removeLayer(mapLayers.find((layer) => layer.type == "offers").layer.getLayer());
  });

  $("#offer-lines-toggle").on("click", () => {
    if ($("#offer-lines-toggle").is(":checked")) {
      map.addLayer(mapLayers.find((layer) => layer.type == "offerLines").layer.getLayer());
      return;
    }

    map.removeLayer(mapLayers.find((layer) => layer.type == "offerLines").layer.getLayer());
  });

  $("#demand-lines-toggle").on("click", () => {
    if ($("#demand-lines-toggle").is(":checked")) {
      map.addLayer(mapLayers.find((layer) => layer.type == "demandLines").layer.getLayer());
      return;
    }

    map.removeLayer(mapLayers.find((layer) => layer.type == "demandLines").layer.getLayer());
  });
}

class MapLayer {
  constructor() {
    // initialize map layer and add it to map
    this.layer = L.markerClusterGroup();
    this.layer.addTo(map);

    // initialize all used icons
    const iconsSize = [24, 24],
      iconsAnchor = [0, 0],
      popupsAnchor = [0, -48];
    this.baseIcon = L.icon({ iconUrl: "../../images/markers/marker_base.png", iconSize: iconsSize, iconAnchor: iconsAnchor, popupAnchor: popupsAnchor });
    this.rescuerIcon = L.icon({ iconUrl: "../../images/markers/marker_rescuer.png", iconSize: iconsSize, iconAnchor: iconsAnchor, popupAnchor: popupsAnchor });
    this.rescuerTaskIcon = L.icon({ iconUrl: "../../images/markers/marker_rescuer_with_tasks.png", iconSize: iconsSize, iconAnchor: iconsAnchor, popupAnchor: popupsAnchor });
    this.offerIcon = L.icon({ iconUrl: "../../images/markers/marker_civilian_offer.png", iconSize: iconsSize, iconAnchor: iconsAnchor, popupAnchor: popupsAnchor });
    this.notPickedOfferIcon = L.icon({ iconUrl: "../../images/markers/marker_civilian_no_offer.png", iconSize: iconsSize, iconAnchor: iconsAnchor, popupAnchor: popupsAnchor });
    this.demandIcon = L.icon({ iconUrl: "../../images/markers/marker_civilian_demand.png", iconSize: iconsSize, iconAnchor: iconsAnchor, popupAnchor: popupsAnchor });
    this.notPickedDemandIcon = L.icon({ iconUrl: "../../images/markers/marker_civilian_no_demand.png", iconSize: iconsSize, iconAnchor: iconsAnchor, popupAnchor: popupsAnchor });
  }

  createMarkers(data, type) {
    let location = new Array();
    if (type === "baseLocation") {
      // create the base marker
      let baseLocation = [data.latitude, data.Longitude];
      const baseMarker = new Marker(baseLocation, this.baseIcon, true);
      this.layer.addLayer(baseMarker.getMarker());

      // base marker movement functionality
      baseMarker.getMarker().on("moveend", (e) => {
        // create base marker draggable functionality
        generateConfirm(
          "Confirmation",
          "Are you sure you want to change base location?",
          () => {
            // admin want's to change base location
            callAjaxPostRequestFunc(
              "./misc/updateBaseLocation.php",
              { latitude: e.target._latlng.lat, longitude: e.target._latlng.lng },
              () => {
                // base updated successfully
                generateAlert("Success", "Base location successfully updated", "success");
                baseLocation = e.target._latlng;
                baseMarker.getMarker().setLatLng(baseLocation);
              },
              () => {
                // base could not update
                generateAlert("Error", "Couldn't update base location", "error");
                baseMarker.getMarker().setLatLng(baseLocation);
              }
            );
          },
          () => {
            // admin does not want to change base location
            baseMarker.getMarker().setLatLng(baseLocation);
          }
        );
      });
      return;
    }

    if (type === "rescuers") {
      // create rescuers markers
      Object.values(data).forEach((rescuer) => {
        location = [rescuer.latitude, rescuer.longitude];
        let tempMarker = new Marker(location, this.rescuerIcon);
        tempMarker.createAndBindrescuerPopup(rescuer);
        this.layer.addLayer(tempMarker.getMarker());
      });
    }

    if (type === "demands") {
      // create demand markers
      Object.values(data).forEach((demand) => {
        location = [demand.citizenLatitude, demand.citizenLongitude];

        // if demand was NOT picked up by a rescuer
        let tempMarker = new Marker(location, this.notPickedDemandIcon);
        tempMarker.createAndBindOfferDemandPopup(demand, "Demand");
        this.layer.addLayer(tempMarker.getMarker());
      });
      return;
    }

    if (type === "pickedDemands") {
      // if demand was picked up by a rescuer
      Object.values(data).forEach((demand) => {
        location = [demand.citizenLatitude, demand.citizenLongitude];

        let tempMarker = new Marker(location, this.demandIcon);
        tempMarker.createAndBindOfferDemandPopup(demand, "Demand");
        this.layer.addLayer(tempMarker.getMarker());
      });
      return;
    }

    if (type === "offers") {
      // create offers markers
      Object.values(data).forEach((offer) => {
        location = [offer.citizenLatitude, offer.citizenLongitude];
        // if offers was NOT picked up by a rescuer
        let tempMarker = new Marker(location, this.notPickedOfferIcon);
        tempMarker.createAndBindOfferDemandPopup(offer, "Offer");
        this.layer.addLayer(tempMarker.getMarker());
      });
      return;
    }

    if (type === "pickedOffers") {
      Object.values(data).forEach((offer) => {
        location = [offer.citizenLatitude, offer.citizenLongitude];
        // if offers was picked up by a rescuer
        let tempMarker = new Marker(location, this.offerIcon);
        tempMarker.createAndBindOfferDemandPopup(offer, "Offer");
        this.layer.addLayer(tempMarker.getMarker());
      });
      return;
    }

    if (type === "offerLines") {
      Object.values(data).forEach((offerLine) => {
        if (offerLine.rescuerLatitude === null || offerLine.rescuerLongitude === null) {
          // if rescuer is not set (equal to null) then we don't create a polyline
          return;
        }

        // create polyline
        let citizenLocation = [offerLine.citizenLatitude, offerLine.citizenLongitude],
          rescuerLocation = [offerLine.rescuerLatitude, offerLine.rescuerLongitude],
          tempPolyLine = new PolyLine(citizenLocation, rescuerLocation, "#2acacf");
        this.layer.addLayer(tempPolyLine.getPolyLine());
      });
    }

    if (type === "demandLines") {
      Object.values(data).forEach((demandLines) => {
        if (demandLines.rescuerLatitude === null || demandLines.rescuerLongitude === null) {
          // if rescuer is not set (equal to null) then we don't create a polyline
          return;
        }

        // create polyline
        let citizenLocation = [demandLines.citizenLatitude, demandLines.citizenLongitude],
          rescuerLocation = [demandLines.rescuerLatitude, demandLines.rescuerLongitude],
          tempPolyLine = new PolyLine(citizenLocation, rescuerLocation, "#af27bb");
        this.layer.addLayer(tempPolyLine.getPolyLine());
      });
    }
  }

  getLayer() {
    return this.layer;
  }
}

class Marker {
  constructor(location, icon, draggable = false) {
    this.marker = L.marker(location, { icon: icon, draggable: draggable });
  }

  createAndBindrescuerPopup(popupData) {
    const popupWrapperDiv = document.createElement("div");
    popupWrapperDiv.classList.add("popup-wrapper");

    const popupTitleH2 = document.createElement("h2");
    popupTitleH2.innerText = "rescuer";
    popupWrapperDiv.appendChild(popupTitleH2);

    const rescuerInfoDiv = document.createElement("div");
    rescuerInfoDiv.classList.add("popup-info");
    popupWrapperDiv.appendChild(rescuerInfoDiv);

    const rescuerNameRow = this.getGridRow({ left: "Name:", right: popupData.name });
    rescuerInfoDiv.append(rescuerNameRow.left, rescuerNameRow.right);

    const rescuerPhoneRow = this.getGridRow({ left: "Phone:", right: popupData.phone });
    rescuerInfoDiv.append(rescuerPhoneRow.left, rescuerPhoneRow.right);

    if(Object.values(popupData.products).length > 1){ // if there is at least one product to display
      // create product info green box and title
      const popupProductsTitleH3 = document.createElement("h3");
      popupProductsTitleH3.innerText = "Products";
      popupWrapperDiv.appendChild(popupProductsTitleH3);
      
      const rescuerProdInfo = document.createElement("div");
      rescuerProdInfo.classList.add("popup-info");
      popupWrapperDiv.appendChild(rescuerProdInfo);
      
      Object.values(popupData.products).forEach((product) => {
        if(product.name == null || product.quantity == null) return;
  
        const productInfo = this.getGridRow({ left:product.name, right:product.quantity })
        rescuerProdInfo.append(productInfo.left, productInfo.right)
      });
    }

    this.marker.bindPopup(popupWrapperDiv);
  }

  createAndBindOfferDemandPopup(popupData, type) {
    const popupWrapperDiv = document.createElement("div"); // popupWrapperDiv = <div></div>
    popupWrapperDiv.classList.add("popup-wrapper"); // popupWrapperDiv = <div class="popup-wrapper"></div>

    const popupTitleH2 = document.createElement("h2"); // popupTitleH2 = <h2></h2>
    popupTitleH2.innerText = type; // popupTitleH2 = <h2>Offer</h2>
    popupWrapperDiv.appendChild(popupTitleH2); // <div class="popup-wrapper">  <h2>Offer</h2>  </div>

    const citizenInfoDiv = document.createElement("div"); // citizenInfoDiv = <div></div>
    citizenInfoDiv.classList.add("popup-info"); // citizenInfoDiv = <div class="popup-info"></div>
    popupWrapperDiv.appendChild(citizenInfoDiv); // <div class="popup-wrapper">  <h2>Offer</h2> <div class="popup-info"></div> </div>

    const citizenNameRow = this.getGridRow({ left: "Citizen Name: ", right: popupData.citizenName });
    // left = <div>Citizen Name: </div>
    // right = <div>popupData.citizenName</div>
    citizenInfoDiv.append(citizenNameRow.left, citizenNameRow.right);

    const citizenPhoneRow = this.getGridRow({ left: "Citizen Phone: ", right: popupData.citizenPhone });
    citizenInfoDiv.append(citizenPhoneRow.left, citizenPhoneRow.right);

    const createdDateRow = this.getGridRow({ left: "Created At: ", right: popupData.created });
    citizenInfoDiv.append(createdDateRow.left, createdDateRow.right);

    const productInfoGrid = document.createElement("div");
    productInfoGrid.classList.add("popup-info");
    popupWrapperDiv.appendChild(productInfoGrid);

    const productKindRow = this.getGridRow({ left: "Product Kind: ", right: popupData.productName });
    productInfoGrid.append(productKindRow.left, productKindRow.right);

    const productQuantityRow = this.getGridRow({ left: "Product Quantity: ", right: popupData.quantity });
    productInfoGrid.append(productQuantityRow.left, productQuantityRow.right);

    if (popupData.rescuerId === null) {
      // if demand / offer is not picked up by a rescuer
      this.marker.bindPopup(popupWrapperDiv);
      return;
    }

    const rescuerInfoGrid = document.createElement("div");
    rescuerInfoGrid.classList.add("popup-info");
    popupWrapperDiv.appendChild(rescuerInfoGrid);

    const rescuerUsernameRow = this.getGridRow({ left: "rescuer Name: ", right: popupData.rescuerName });
    rescuerInfoGrid.append(rescuerUsernameRow.left, rescuerUsernameRow.right);

    const rescuerPickedDateRow = this.getGridRow({ left: "Picked At: ", right: popupData.picked });
    rescuerInfoGrid.append(rescuerPickedDateRow.left, rescuerPickedDateRow.right);

    this.marker.bindPopup(popupWrapperDiv);
  }

  getGridRow(data) {
    // data = { left: "", right: "" }
    // function to make a row of a grid with 2 columns (it returns the left and right column of the row)
    const rowLeft = document.createElement("div"); // rowLeft = <div></div>
    rowLeft.innerText = data.left; // rowLeft = <div>data.left</div>

    const rowRight = document.createElement("div"); // rowRight = <div></div>
    rowRight.innerText = data.right; // rowRight = <div>data.right</div>

    return { left: rowLeft, right: rowRight };
  }

  getMarker() {
    return this.marker;
  }
}

class PolyLine {
  constructor(locationStart, locationEnd, color) {
    this.polyLine = L.polyline([locationStart, locationEnd], { color: color });
  }

  getPolyLine() {
    return this.polyLine;
  }
}
