let products;
let rescuerProducts;
let pickedProduct = null;
let rescuerId = null;

$(document).ready(function () {
  $.modal.defaults = {
    closeExisting: false,
    escapeClose: true,
    clickClose: true,
    showClose: true,
  };

  fetchSessionInfo().then(() => {
    $("#manage-tasks").on("click", () => {
      $("#tasks-modal").modal({ fadeDuration: 100 });
      loadTasks();
    });
  });

  callAjaxGetRequestFunc("./misc/getBaseProducts.php", onProductsFound);
  callAjaxGetRequestFunc("./misc/getRescuerProducts.php", onrescuerProductsFound);

  // add product functionality
  $("#add-prod-btn").on("click", () => {
    if (parseInt($("#product-quantity").val()) > pickedProduct.baseQuantity) {
      generateAlert("Error", "Not enough quantity in base", "error");
      return;
    }
    data = { productId: pickedProduct.id, quantity: parseInt($("#product-quantity").val()) };
    callAjaxPostRequestFunc("./misc/pickUpProductFromBase.php", data, onProductAdded);
  });

  $("#remove-from-vehicle-btn").on("click", () => {
    generateConfirm("Confirmation", "Are you sure you want to unload your vehicle?", () => {
      // rescuer wants to deposit all products
      callAjaxPostRequestFunc("./misc/dropProductsToBase.php", {}, (response) => {
        if (response !== "success") {
          // products could not be deposited
          generateAlert("Error", "Could not unload", "error");
          return;
        }

        // products successfully deposited
        callAjaxGetRequestFunc("./misc/getRescuerProducts.php", onrescuerProductsFound);
        callAjaxGetRequestFunc("./misc/getBaseProducts.php", updateProductTables);
        generateAlert("Success", "Products successfully deposited", "success");
      });
    });
  });

  $("#show-vehicle-warehouse").on("click", () => {
    $("#vehicle-modal").modal({ fadeDuration: 100 });
  });
});

function fetchSessionInfo() {
  return $.ajax({
    url: '../../getSessionInfo.php', // Adjust the path as needed
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      if (response.error) {
        console.error("Error fetching session info: ", response.error);
      } else {
        console.log("User ID: ", response.user_id);
        console.log("Username: ", response.username);
        console.log("User Type: ", response.user_type);
        rescuerId = response.user_id; // Set the global rescuerId variable
      }
    },
    error: function(xhr, status, error) {
      console.error("AJAX error: ", status, error);
    }
  });
}

function loadTasks() {
  if (rescuerId === null) {
    console.error("rescuer ID not set");
    return;
  }

  $.ajax({
    url: '../../getTasks.php', // Adjust the path as needed
    method: 'GET',
    dataType: 'json',
    data: { rescuer_id: rescuerId },
    success: function(response) {
      if (response.error) {
        console.error("Error fetching tasks: ", response.error);
      } else {
        displayTasks(response);
      }
    },
    error: function(xhr, status, error) {
      console.error("AJAX error: ", status, error);
    }
  });
}

function displayTasks(tasks) {
  const tasksList = $("#tasks-list");
  tasksList.empty();

  tasks.forEach(task => {
    const createdDate = new Date(task.created);
    const today = new Date();
    let createdDisplay = createdDate.toLocaleDateString();

    if (createdDate.toDateString() === today.toDateString()) {
      createdDisplay = `Today at ${createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      createdDisplay = `${createdDate.toLocaleDateString()} at ${createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    const taskItem = `
      <tr>
        <td class="py-2 px-4">${task.id}</td>
        <td class="py-2 px-4">${task.type}</td>
        <td class="py-2 px-4">${task.productId}</td>
        <td class="py-2 px-4">${task.quantity}</td>
        <td class="py-2 px-4">${createdDisplay}</td>
        <td class="py-2 px-4 timeline-container">
          <div class="timeline-item">
            <span class="status-text">${getStatus(task)}</span>
          </div>
        </td>
        <td class="py-2 px-4">${task.name}</td>
        <td class="py-2 px-4">${task.phone}</td>
      </tr>
    `;
    tasksList.append(taskItem);
  });
}

function getStatus(task) {
  const today = new Date();
  const completedDate = new Date(task.completed);
  const pickedDate = new Date(task.picked);

  if (task.completed) {
    if (completedDate.toDateString() === today.toDateString()) {
      return `Completed today at ${completedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `Completed on ${completedDate.toLocaleDateString()} at ${completedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  } else if (task.picked) {
    if (pickedDate.toDateString() === today.toDateString()) {
      return `Picked today at ${pickedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `Picked on ${pickedDate.toLocaleDateString()} at ${pickedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  } else {
    return "Pending";
  }
}



function onProductsFound(response) {
  products = new BaseProductDivs(document.getElementById("base-products"));

  Object.keys(response).forEach((key) => {
    products.addProduct(new Product(key, response[key].name, response[key].baseQuantity)).addProductToTable();
  });
}

function onrescuerProductsFound(response) {
  $("#vehicle-products").empty(); // empty products and then add them again
  rescuerProducts = new VehicleProductsDiv(document.getElementById("vehicle-products"));

  Object.keys(response).forEach((key) => {
    rescuerProducts.addProduct(new Product(key, response[key].name, response[key].quantity)).addProductToTable();
  });
}

function updateProductTables(response) {
  // update both products in tables
  while (products.productsTbody.firstChild) {
    products.productsTbody.removeChild(products.productsTbody.lastChild);
  }

  Object.keys(response).forEach((key) => {
    products.addProduct(new Product(key, response[key].name, response[key].baseQuantity)).addProductToTable();
  });
}

function onProductAdded(response) {
  if (response !== "success") {
    generateAlert("Error", "Could not get product from base", "error");
    return;
  }

  callAjaxGetRequestFunc("./misc/getRescuerProducts.php", onrescuerProductsFound);
  generateAlert("Success", "Product successfully added", "success");
  callAjaxGetRequestFunc("./misc/getBaseProducts.php", updateProductTables);
}

class VehicleProductsDiv {
  constructor(productsBody) {
    this.productsBody = productsBody;
    this.products = new Array();
  }

  addProduct(product) {
    var tempProduct;
    if (product instanceof Product) tempProduct = product;
    else {
      tempProduct = new Product(product.id, product.name, product.baseQuantity);
    }
    this.products.push(tempProduct);

    function addProductToTable() {
      const productTr = document.createElement("tr");

      const productNameTd = document.createElement("td");
      productNameTd.innerText = tempProduct.name;
      productTr.appendChild(productNameTd);

      const productVehicleQuantityTd = document.createElement("td");
      productVehicleQuantityTd.innerText = tempProduct.baseQuantity;
      productTr.appendChild(productVehicleQuantityTd);

      this.productsBody.appendChild(productTr);
    }
    return { addProductToTable: addProductToTable.bind(this) };
  }
}

class BaseProductDivs {
  constructor(productsTbody) {
    this.productsTbody = productsTbody;
    this.products = new Array();
    this.pickedProduct = null;
  }

  addProduct(product) {
    var tempProduct;
    if (product instanceof Product) tempProduct = product;
    else {
      tempProduct = new Product(product.id, product.name, product.baseQuantity);
    }
    this.products.push(tempProduct);

    function addProductToTable() {
      const productTr = document.createElement("tr");

      const productNameTd = document.createElement("td");
      productNameTd.innerText = tempProduct.name;
      productTr.appendChild(productNameTd);

      const productBaseQuantityTd = document.createElement("td");
      productBaseQuantityTd.innerText = tempProduct.baseQuantity;
      productTr.appendChild(productBaseQuantityTd);

      const addBtnTd = document.createElement("td");
      productTr.appendChild(addBtnTd);

      const productAddBtn = document.createElement("button");
      productAddBtn.innerText = "Load";
      productAddBtn.classList.add("add-to-vehicle-btn");
      productAddBtn.classList.add("bg-yellow-500", "hover:bg-yellow-600", "text-white", "font-bold", "rounded");
      addBtnTd.appendChild(productAddBtn);

      productAddBtn.addEventListener("click", () => {
        if (tempProduct.baseQuantity <= 0) {
          generateAlert("Error", "This product is unavailable! Quantity is 0", "error");
          return;
        }

        pickedProduct = tempProduct;
        $("#product-name").text(tempProduct.name);
        $("#product-modal").modal({ fadeDuration: 100 });
      });

      this.productsTbody.appendChild(productTr);
    }

    return { addProductToTable: addProductToTable.bind(this) };
  }
}

class Product {
  constructor(id, name, baseQuantity) {
    this.id = id;
    this.name = name;
    this.baseQuantity = baseQuantity;
  }
}
