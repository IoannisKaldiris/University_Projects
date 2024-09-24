let offers = [];
let demands = [];

$(document).ready(function () {
  updateHistory();

  // Handle cancel button click for offers
  $(document).on("click", ".cancel-btn", function () {
    const offerId = parseInt($(this).data("id"), 10);
    const offer = offers.find((offer) => offer.id === offerId);

    if (!offer) {
      generateAlert("Error", "Offer not found", "error");
      return;
    }

    if (offer.canceled || offer.picked || offer.completed) {
      generateAlert("Error", "You can't cancel an offer that is already canceled, picked, or completed", "error");
      return;
    }

    $.ajax({
      url: "./misc/cancelOffer.php",
      type: 'GET',
      dataType: 'json',
      data: { offerId: offer.id },
      success: function(response) {
        if (response.status !== "success") {
          generateAlert("Error", "Could not cancel offer. Please try again later", "error");
          return;
        }

        // Update the offer's state
        offer.canceled = true;
        updateHistory();
        generateAlert("Success", "Offer canceled", "success");
      }
    });
  });

  // Handle cancel button click for demands
  $(document).on("click", ".cancel-demand-btn", function () {
    const demandId = parseInt($(this).data("id"), 10);
    const demand = demands.find((demand) => demand.id === demandId);

    if (!demand) {
      generateAlert("Error", "Demand not found", "error");
      return;
    }

    if (demand.canceled || demand.picked || demand.completed) {
      generateAlert("Error", "You can't cancel a demand that is already canceled, picked, or completed", "error");
      return;
    }

    $.ajax({
      url: "./misc/cancelDemand.php",
      type: 'GET',
      dataType: 'json',
      data: { demandId: demand.id },
      success: function(response) {
        if (response.status !== "success") {
          generateAlert("Error", "Could not cancel demand. Please try again later", "error");
          return;
        }

        // Update the demand's state
        demand.canceled = true;
        updateHistory();
        generateAlert("Success", "Demand canceled", "success");
      }
    });
  });
});

function updateHistory() {
  $.ajax({
    url: "./misc/getHistory.php",
    type: 'GET',
    dataType: 'json',
    success: onHistoryRetrieved
  });
}

function onHistoryRetrieved(response) {
  $("#offers-grid").empty();
  $("#demands-grid").empty();

  if (response.offers) {
    offers = Object.keys(response.offers).map((key) => createOffer(key, response.offers[key]));
    offers.forEach((offer) => {
      $("#offers-grid").append(offer.toDiv());
    });
  }

  if (response.demands) {
    demands = Object.keys(response.demands).map((key) => createDemand(key, response.demands[key]));
    demands.forEach((demand) => {
      $("#demands-grid").append(demand.toDiv());
    });
  }
}

function createOffer(id, data) {
  return {
    id: parseInt(id, 10),
    productId: data.productId,
    productName: data.productName,
    quantity: data.quantity,
    created: data.created,
    completed: data.completed,
    canceled: data.canceled === "1",
    picked: data.picked,
    toDiv: function() {
      const offerDiv = document.createElement("div");
      offerDiv.classList.add("product-card", "bg-gray-800", "text-white", "p-4", "rounded-lg", "shadow-md", "space-y-2", "flex", "flex-col", "items-start", "hover:bg-gray-700", "cursor-pointer");

      if (this.canceled || this.completed) {
        offerDiv.classList.add("bg-gray-600", "cursor-not-allowed", "opacity-50", "pointer-events-none");
      }

      const title = document.createElement("div");
      title.classList.add("font-bold", "text-lg");
      title.innerText = this.productName;
      offerDiv.appendChild(title);

      const details = document.createElement("div");
      details.classList.add("text-sm", "text-gray-400");
      details.innerHTML = `
        <p><em>Quantity:</em> ${this.quantity}</p>
        <p><em>Created:</em> ${this.created}</p>
        <p><em>Picked:</em> ${this.picked || "Not picked up yet"}</p>
        <p><em>Completed:</em> ${this.completed || "Not completed yet"}</p>
      `;
      offerDiv.appendChild(details);

      const cancelButton = document.createElement("button");
      cancelButton.classList.add("cancel-btn", "bg-red-600", "hover:bg-red-500", "text-white", "font-bold", "py-1", "px-2", "rounded", "self-end");
      if (this.completed) {
        cancelButton.innerText = "Completed!";
        cancelButton.classList.add("cancel-btn", "bg-green-600", "text-white", "font-bold", "py-1", "px-2", "rounded", "self-end");
      } else if (this.canceled) {
        cancelButton.innerText = "Canceled!";
        cancelButton.classList.add("cancel-btn", "bg-red-600", "hover:bg-red-500", "text-white", "font-bold", "py-1", "px-2", "rounded", "self-end");
      } else {
        cancelButton.innerText = "X"
      }
      cancelButton.dataset.id = this.id;
      offerDiv.appendChild(cancelButton);

      return offerDiv;
    }
  };
}

function createDemand(id, data) {
  return {
    id: parseInt(id, 10),
    productId: data.productId,
    productName: data.productName,
    peopleConcerns: data.peopleConcerns,
    created: data.created,
    completed: data.completed,
    canceled: data.canceled === "1",
    picked: data.picked,
    toDiv: function() {
      const demandDiv = document.createElement("div");
      demandDiv.classList.add("product-card", "bg-gray-800", "text-white", "p-4", "rounded-lg", "shadow-md", "space-y-2", "flex", "flex-col", "items-start", "hover:bg-gray-700", "cursor-pointer");

      if (this.canceled || this.completed) {
        demandDiv.classList.add("bg-gray-600", "cursor-not-allowed", "opacity-50", "pointer-events-none");
      }

      const title = document.createElement("div");
      title.classList.add("font-bold", "text-lg");
      title.innerText = this.productName;
      demandDiv.appendChild(title);

      const details = document.createElement("div");
      details.classList.add("text-sm", "text-gray-400");
      details.innerHTML = `
        <p><em>Quantity:</em> ${this.peopleConcerns}</p>
        <p><em>Created:</em> ${this.created}</p>
        <p><em>Picked:</em> ${this.picked || "Not picked up yet"}</p>
        <p><em>Completed:</em> ${this.completed || "Not completed yet"}</p>
      `;
      demandDiv.appendChild(details);

      const cancelButton = document.createElement("button");
      cancelButton.classList.add("cancel-demand-btn", "bg-red-600", "hover:bg-red-500", "text-white", "font-bold", "py-1", "px-2", "rounded", "self-end");
      if (this.completed) {
        cancelButton.innerText = "Completed!";
        cancelButton.classList.add("cancel-btn", "bg-green-600", "text-white", "font-bold", "py-1", "px-2", "rounded", "self-end");
      } else if (this.canceled) {
        cancelButton.innerText = "Canceled!";
        cancelButton.classList.add("cancel-btn", "bg-red-600", "hover:bg-red-500", "text-white", "font-bold", "py-1", "px-2", "rounded", "self-end");
      } else {
        cancelButton.innerText = "X"
      }
      cancelButton.dataset.id = this.id;
      demandDiv.appendChild(cancelButton);

      return demandDiv;
    }
  };
}
