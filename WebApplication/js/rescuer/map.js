function onMapClick(e) {
  // we don't want to do anything on map click so we just return
  // (we need it cause we initialize it on map.js)
  return;
}

// initialize used icons variables
const iconsSize = [24, 24];
let icons = new Object();

var rescuerLocation = new Array();
var mapLayers = new Array();

$(document).ready(function () {
  // initialize used icons
  icons = {
    baseIcon: L.icon({ iconUrl: "../../images/markers/marker_base.png", iconSize: iconsSize}),
    rescuerIcon: L.icon({ iconUrl: "../../images/markers/marker_rescuer.png", iconSize: iconsSize}),
    rescuerTaskIcon: L.icon({ iconUrl: "../../images/markers/marker_rescuer_with_tasks.png", iconSize: iconsSize}),
    offerIcon: L.icon({ iconUrl: "../../images/markers/marker_civilian_offer.png", iconSize: iconsSize}),
    notPickedOfferIcon: L.icon({ iconUrl: "../../images/markers/marker_civilian_no_offer.png", iconSize: iconsSize}),
    demandIcon: L.icon({ iconUrl: "../../images/markers/marker_civilian_demand.png", iconSize: iconsSize}),
    notPickedDemandIcon: L.icon({ iconUrl: "../../images/markers/marker_civilian_no_demand.png", iconSize: iconsSize}),
  };

  // get map data and add them to map
  callAjaxGetRequestFunc("./misc/getMapData.php", onDataRetrieved);

  $("#rescuers-toggle").on("click", function () {
    if ($("#rescuers-toggle").is(":checked")) {
      map.addLayer(mapLayers.find((layer) => layer.type == "rescuer").layer.getLayer());
      return;
    }

    map.removeLayer(mapLayers.find((layer) => layer.type == "rescuer").layer.getLayer());
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
});

function onDataRetrieved(response) {
  if (response == "error") {
    generateAlert("Error", "No connection to database. Please try again later", "error");
    return;
  }

  map.setView([response.rescuerInfo.latitude, response.rescuerInfo.longitude], 12);
  generateLayers(response);
}

function updateMap() {
  removeMapLayers();
  callAjaxGetRequestFunc("./misc/getMapData.php", onDataRetrieved);
}

function removeMapLayers() {
  mapLayers.forEach((l) => {
    map.removeLayer(l["layer"].getLayer());
  });
}

function generateLayers(data) {
  mapLayers = new Array();

  // create rescuer marker and dragging functionality
  rescuerLocation = [data.rescuerInfo.latitude, data.rescuerInfo.longitude];
  let rescuerMarker = new Marker(rescuerLocation, icons.rescuerIcon, "rescuer", 0, true);
  rescuerMarker.getMarker().on("moveend", (e) => {
    callAjaxPostRequestFunc(
      "./misc/updateRescuerLocation.php",
      { latitude: e.target._latlng.lat, longitude: e.target._latlng.lng },
      (response) => {
        if (response != "success") {
          generateAlert("Error", "Couldn't update your location.\nPlease try again later", "error");
          rescuerMarker.getMarker().setLatLng(rescuerLocation);
          return;
        }
        // rescuer location updated successfully
        generateAlert("Success", "Your location successfully updated", "success");
        rescuerLocation = [e.target._latlng.lat, e.target._latlng.lng];
        rescuerMarker.getMarker().setLatLng(rescuerLocation);

        // update offer lines layer
        mapLayers
          .find((layer) => layer.type === "offerLines") // find demand lines layer from mapLayers list
          .layer.innerLayers.forEach((l) => {
            // iterate through all inner layers of the current layer
            // and update polyline on each of them
            l.updatePolyLine();
          });

        // update demand lines layer
        mapLayers
          .find((layer) => layer.type === "demandLines") // find demand lines layer from mapLayers list
          .layer.innerLayers.forEach((l) => {
            // iterate through all inner layers of the current layer
            // and update polyline on each of them
            l.updatePolyLine();
          });

        // update pickedDemands markers popups
        mapLayers
          .find((layer) => layer.type === "pickedDemands") // find pickedDemands layer from mapLayers list
          .layer.innerLayers.forEach((l) => {
            // iterate through all inner layers of the current layer
            // and update popups on each of them
            l.updateOfferDemandPopup();
          });
        // update pickedOffers markers popups
        mapLayers
          .find((layer) => layer.type === "pickedOffers") // find pickedOffers layer from mapLayers list
          .layer.innerLayers.forEach((l) => {
            // iterate through all inner layers of the current layer
            // and update popups on each of them
            l.updateOfferDemandPopup();
          });

        // update base marker popup
        mapLayers
          .find((layer) => layer.type === "base") // find pickedOffers layer from mapLayers list
          .layer.innerLayers.forEach((l) => {
            // iterate through all inner layers of the current layer
            // and update popups on each of them
            l.updateBasePopup();
          });
      },
      (error) => {
        // rescuer location could not be updated
        generateAlert("Error", "Couldn't update your location.\nPlease try again later", "error");
        rescuerMarker.getMarker().setLatLng(rescuerLocation);
      }
    );
  });
  rescuerLayer = new MapLayer();
  rescuerLayer.addMarker(rescuerMarker, icons.rescuerIcon, "rescuer", 0);
  mapLayers.push({ type: "rescuer", layer: rescuerLayer });

  // add base marker to map
  baseLayer = new MapLayer();
  let baseMarker = new Marker([data.baseLocation.latitude, data.baseLocation.longitude], icons.baseIcon, "base", 0);
  baseMarker.bindPopup();
  baseLayer.addMarker(baseMarker);
  mapLayers.push({ type: "base", layer: baseLayer });

  // create all other marker layers and add them to mapLayers list
  mapLayers.push({ type: "demands", layer: new MapLayer() });
  mapLayers.push({ type: "offers", layer: new MapLayer() });
  mapLayers.push({ type: "pickedDemands", layer: new MapLayer() });
  mapLayers.push({ type: "pickedOffers", layer: new MapLayer() });
  mapLayers.push({ type: "offerLines", layer: new MapLayer() });
  mapLayers.push({ type: "demandLines", layer: new MapLayer() });

  // add markers to demands layer
  if ("demands" in data) {
    Object.values(data["demands"]).forEach((demandValue) => {
      id = Object.keys(data["demands"]).find((key) => data["demands"][key] === demandValue);

      tempMarker = new Marker([demandValue.latitude, demandValue.longitude], icons.notPickedDemandIcon, "demand", id);
      tempMarker.bindPopup(demandValue, "Demand");

      layer = mapLayers
        .find((layer) => layer.type === "demands") // find demands layer
        .layer // get demands layer
        .addMarker(tempMarker); // add marker to demands layer
    });
  }

  // add markers to offer layer
  if ("offers" in data) {
    Object.values(data["offers"]).forEach((offerValue) => {
      id = Object.keys(data["offers"]).find((key) => data["offers"][key] === offerValue);

      tempMarker = new Marker([offerValue.latitude, offerValue.longitude], icons.notPickedOfferIcon, "offer", id);
      tempMarker.bindPopup(offerValue, "Offer");

      mapLayers
        .find((layer) => layer.type === "offers") // find offers layer
        .layer // get offers layer
        .addMarker(tempMarker); // add marker to offers layer
    });
  }

  // add markers to picked demands layer
  if ("pickedDemands" in data) {
    Object.values(data["pickedDemands"]).forEach((demandValue) => {
      id = Object.keys(data["pickedDemands"]).find((key) => data["pickedDemands"][key] === demandValue);

      tempMarker = new Marker([demandValue.latitude, demandValue.longitude], icons.demandIcon, "pickedDemand", id);
      tempMarker.bindPopup(demandValue, "Demand");

      mapLayers
        .find((layer) => layer.type === "pickedDemands") // find picked demands layer
        .layer // get picked demands layer
        .addMarker(tempMarker); // add marker to picked demands layer
    });
  }

  // add markers to picked offers layer
  if ("pickedOffers" in data) {
    Object.values(data["pickedOffers"]).forEach((offerValue) => {
      id = Object.keys(data["pickedOffers"]).find((key) => data["pickedOffers"][key] === offerValue);

      tempMarker = new Marker([offerValue.latitude, offerValue.longitude], icons.offerIcon, "pickedOffer", id);
      tempMarker.bindPopup(offerValue, "Offer");

      mapLayers
        .find((layer) => layer.type === "pickedOffers") // find picked offers layer
        .layer // get picked offers layer
        .addMarker(tempMarker); // add marker to picked offers layer
    });
  }

  // add lines between picked offers and rescuer
  if ("offerLines" in data) {
    Object.values(data["offerLines"]).forEach((offerLine) => {
      mapLayers
        .find((layer) => layer.type === "offerLines") // find offers lines layer
        .layer // get offers lines layer
        .addPolyline(rescuerMarker, [offerLine.citizenLatitude, offerLine.citizenLongitude], "red"); // add polyline to offer lines layer
    });
  }

  // add lines between picked demands and rescuer
  if ("demandLines" in data) {
    Object.values(data["demandLines"]).forEach((demandLine) => {
      mapLayers
        .find((layer) => layer.type === "demandLines") // find demand lines layer
        .layer // get demand lines layer
        .addPolyline(rescuerMarker, [demandLine.citizenLatitude, demandLine.citizenLongitude], "blue"); // add polyline to demand lines layer
    });
  }
}

class MapLayer {
  constructor() {
    // initialize map layer and add it to map
    this.layer = L.markerClusterGroup();
    this.layer.addTo(map);
    this.innerLayers = new Array();
  }

  addMarker(marker) {
    this.innerLayers.push(marker);
    this.layer.addLayer(marker.getMarker());
  }

  addPolyline(markerStart, locationEnd, color) {
    const tempPolyLine = new PolyLine(markerStart, locationEnd, color);
    this.innerLayers.push(tempPolyLine);
    this.layer.addLayer(tempPolyLine.getPolyLine());
  }

  getLayer() {
    return this.layer;
  }
}

class Marker {
  constructor(location, icon, type, id, draggable = false) {
    this.type = type;
    this.id = id;
    this.location = location;
    this.marker = L.marker(location, { icon: icon, draggable: draggable });
  }

  updateOfferDemandPopup() {
    this.marker.unbindPopup();
    if (this.type.toLowerCase().includes("offer")) this.bindPopup(this.data, "Offer");
    else this.bindPopup(this.data, "Demand");
  }

  updateBasePopup() {
    this.marker.unbindPopup();
    this.bindPopup();
  }

  createBasePopupWrapper() {
    const popupWrapperDiv = document.createElement("div");
    popupWrapperDiv.classList.add("popup-wrapper");

    const popupTitleH2 = document.createElement("h2");
    popupTitleH2.innerText = "Base Location";
    popupWrapperDiv.appendChild(popupTitleH2);

    const seeWarehouseBtn = document.createElement("button");
    seeWarehouseBtn.classList.add("popup-complete-btn");
    seeWarehouseBtn.innerText = "Inspect";
    seeWarehouseBtn.title = "Inspect";
    seeWarehouseBtn.classList.add("bg-yellow-500", "hover:bg-yellow-600", "text-white", "font-bold","rounded");
    popupWrapperDiv.appendChild(seeWarehouseBtn);

    let distance = getDistanceFromLatLonInKm(rescuerLocation[0], rescuerLocation[1], this.location[0], this.location[1]);
    if (distance >= 0.1) {
      seeWarehouseBtn.disabled = true;
    }

    seeWarehouseBtn.addEventListener("click", () => {
      $("#base-modal").modal({ fadeDuration: 100 });
    });

    return popupWrapperDiv;
  }

  createOfferDemandPopupWrapper = (data, title) => {
    // title = "Offer" or "Demand"
    this.data = data;
    const popupWrapperDiv = document.createElement("div");
    popupWrapperDiv.classList.add("popup-wrapper");

    const popupTitleH2 = document.createElement("h2");
    popupTitleH2.innerText = `${title} - ${this.id}`;
    popupWrapperDiv.appendChild(popupTitleH2);

    const citizenInfoDiv = document.createElement("div");
    citizenInfoDiv.classList.add("popup-info");
    popupWrapperDiv.appendChild(citizenInfoDiv);

    const citizenNameRow = generateGridRow({ left: "Citizen Name: ", right: data.citizenName });
    citizenInfoDiv.append(citizenNameRow.left, citizenNameRow.right);

    const citizenPhoneRow = generateGridRow({ left: "Citizen Phone: ", right: data.citizenPhone });
    citizenInfoDiv.append(citizenPhoneRow.left, citizenPhoneRow.right);

    const createdDateRow = generateGridRow({ left: "Created At: ", right: data.created });
    citizenInfoDiv.append(createdDateRow.left, createdDateRow.right);

    const productInfoGrid = document.createElement("div");
    productInfoGrid.classList.add("popup-info");
    popupWrapperDiv.appendChild(productInfoGrid);

    const productKindRow = generateGridRow({ left: "Product Kind: ", right: data.productName });
    productInfoGrid.append(productKindRow.left, productKindRow.right);

    const productQuantityRow = generateGridRow({ left: "Product Quantity: ", right: data.quantity });
    productInfoGrid.append(productQuantityRow.left, productQuantityRow.right);

    const button = document.createElement("button");
    if (this.type.includes("picked")) {
      // this task has been picked
      const pickedDatetime = document.createElement("div");
      pickedDatetime.classList.add("popup-datetime");
      pickedDatetime.innerText = `Picked date: ${data.picked}`;
      popupWrapperDiv.appendChild(pickedDatetime);

      button.classList.add("popup-leave-btn","bg-yellow-500", "hover:bg-yellow-600", "text-white", "font-bold","rounded");
      button.innerText = "Cancel";
      button.title = "Leave Task";

      button.addEventListener("click", this.letOfferDemand.bind(this));
    } else {
      // this task has not been picked
      button.classList.add("popup-btn","bg-yellow-500", "hover:bg-yellow-600", "text-white", "font-bold","rounded");
      button.innerText = "Take";
      button.title = "Pick Task";

      button.addEventListener("click", this.pickOfferDemand.bind(this));
    }
    popupWrapperDiv.appendChild(button);

    const taskComplete = document.createElement("button");
    taskComplete.classList.add("popup-complete-btn","bg-yellow-500", "hover:bg-yellow-600", "text-white", "font-bold","rounded","ml-1");
    taskComplete.innerText = "Complete Task";
    taskComplete.title = "Complete Task";

    // find distance between rescuer and task
    let distance = getDistanceFromLatLonInKm(rescuerLocation[0], rescuerLocation[1], this.location[0], this.location[1]);
    if (distance <= 0.05 && this.type.toLowerCase().includes("picked")) {
      // if distance is lower than 50 meters and task is picked
      // we add this button to the task popup
      popupWrapperDiv.appendChild(taskComplete);
    }

    taskComplete.addEventListener("click", () => {
      generateConfirm("Confirmation", "Are you sure this task is complete?", () => {
        // task completion confirmed
        let type = "demand";
        if (this.type.toLowerCase().includes("offer")) type = "offer";

        data = { type: type, date: jsDateToMySqlDate(new Date()), id: this.id };
        callAjaxPostRequestFunc("./misc/completeOfferDemand.php", data, this.onTaskCompleteSuccess);
      });
    });

    return popupWrapperDiv;
  };

  onTaskCompleteSuccess(response) {
    console.log(response);
    if (response == 0) {
      generateAlert("Error", "You don't have the requested product in your vehicle", "error");
      return;
    }
    if (response !== "success") {
      generateAlert("Error", "Could not complete task.\nPlease try again later", "error");
      return;
    }

    callAjaxGetRequestFunc("./misc/getRescuerProducts.php", onrescuerProductsFound); // update rescuer products
    updateMap();
    generateAlert("Success", "Task Completed", "success");
  }

  letOfferDemand() {
    let data;
    if (this.type.toLowerCase().includes("offer")) {
      data = { type: "offer", date: "null", id: this.id, toDelete: true };
    } else {
      data = { type: "demand", date: "null", id: this.id, toDelete: true };
    }

    callAjaxPostRequestFunc("./misc/updateOfferDemand.php", data, this.onOfferDemandLeft);
  }

  onOfferDemandLeft(response) {
    // rescuer is trying to leave a task that he has picked up
    if (response !== "success") {
      generateAlert("Error", "Could not leave task.\nPlease try again later", "error");
      return;
    }

    updateMap();
    generateAlert("Success", "Task successfully left", "success");
  }

  pickOfferDemand() {
    let data;
    if (this.type.toLowerCase().includes("offer")) {
      data = { type: "offer", date: jsDateToMySqlDate(new Date()), id: this.id, toDelete: 0 };
    } else {
      data = { type: "demand", date: jsDateToMySqlDate(new Date()), id: this.id, toDelete: 0 };
    }
    callAjaxPostRequestFunc("./misc/updateOfferDemand.php", data, this.onOfferDemandPicked);
  }

  onOfferDemandPicked(response) {
    if (response == 0) {
      generateAlert("Error", "You cannot pick up more than 4 task at once", "error");
      return;
    }
    if (response !== "success") {
      generateAlert("Error", "Could not pick up task.\nPlease try again later", "error");
      return;
    }

    updateMap();
    generateAlert("Success", "Task successfully picked up!", "success");
  }

  bindPopup(data, title) {
    if (this.type === "base") this.marker.bindPopup(this.createBasePopupWrapper());
    else this.marker.bindPopup(this.createOfferDemandPopupWrapper(data, title));
  }

  getMarker() {
    return this.marker;
  }
}

class PolyLine {
  constructor(markerStart, locationEnd, color) {
    this.markerStart = markerStart;
    this.locationEnd = locationEnd;

    this.polyLine = L.polyline([this.markerStart.getMarker().getLatLng(), locationEnd]);
    this.setColor(color);
  }

  setColor(color) {
    this.polyLine.setStyle({ color: color});
  }

  updatePolyLine() {
    this.polyLine.setLatLngs([this.markerStart.getMarker().getLatLng(), this.locationEnd]);
    this.polyLine.redraw();
  }

  getPolyLine() {
    return this.polyLine;
  }
}

// Utility functions
generateGridRow = (data) => {
  // function to make a row of a grid with 2 columns (it returns the left and right column of the row)
  const rowLeft = document.createElement("div");
  rowLeft.innerText = data.left;

  const rowRight = document.createElement("div");
  rowRight.innerText = data.right;

  return { left: rowLeft, right: rowRight };
};

