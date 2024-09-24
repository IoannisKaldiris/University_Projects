let products = new Array();
let productDivs = new Array();

$(document).ready(function () {
  callAjaxGetRequestFunc("./misc/getProductsCategories.php", (response) => {
    // On ajax call returned products
    // Initialize products array
    Object.values(response["products"]).forEach((prod) => {
      products.push(new Product(prod.id, prod.name));
    });

    productDivs.push(new ProductDiv());
    document.getElementById("announcement-form").insertBefore(
      productDivs[productDivs.length - 1].getProductDiv(),
      document.getElementById("add-product-btn")
    );
  });

  $("#add-product-btn").on("click", () => {
    // Add a new Product div to the list
    productDivs.push(new ProductDiv());
    document.getElementById("announcement-form").insertBefore(
      productDivs[productDivs.length - 1].getProductDiv(),
      document.getElementById("add-product-btn")
    );
  });

  $("#create-btn").on("click", () => {
    let createAnnouncementFlag = false;
    productDivs.forEach((productDiv) => {
      // Check if all the required values are properly given
      pickedProd = products.find((product) => {
        // Find picked product from "products" list
        return product.equals(
          productDiv.getProductSelect()[productDiv.getProductSelect().selectedIndex].text
        );
      });

      if (typeof pickedProd === "undefined") {
        createAnnouncementFlag = true;
        return;
      }

      let productQuantity = productDiv.getProductInput().value;
      if (productQuantity === "" || typeof productQuantity === "undefined") {
        createAnnouncementFlag = true;
        return;
      }
    });

    if (createAnnouncementFlag) {
      generateAlert("Error", "You must enter all required information to create an announcement", "error");
      return;
    }

    var announcementData = { created: jsDateToMySqlDate(new Date()) };
    callAjaxPostRequestFunc("./misc/insertAnnouncement.php", announcementData, onAnnouncementCreationSuccess);
  });
});

function onAnnouncementCreationSuccess(response) {
  if (response === "error") {
    generateAlert("Error", "Could not create announcement. Please try again later", "error");
    return;
  }

  // Create announcement products data
  var productAnnouncementData = new Array();
  productDivs.forEach((productDiv) => {
    pickedProd = products.find((product) => {
      // Find picked product from "products" list
      return product.equals(
        productDiv.getProductSelect()[productDiv.getProductSelect().selectedIndex].text
      );
    });
    let productQuantity = productDiv.getProductInput().value;

    productAnnouncementData.push({
      announcementId: response,
      productId: pickedProd.getId(),
      quantity: productQuantity
    });
  });

  callMultipleAjaxPostRequestsFunc(
    productAnnouncementData,
    "./misc/insertAnnouncementProduct.php",
    onAnnouncementProductsInserted
  );
  console.log(response);
}

function onAnnouncementProductsInserted(responseList) {
  console.log(responseList);
  const errorResponse = responseList.filter((ele) => ele != "success");
  if (errorResponse.length != 0) {
    generateAlert("Error", "Could not insert all products in announcement", "error");
    return;
  }

  generateAlert("Success", "Announcement successfully created", "success");
  // Remove picked products from productsDiv
  productDivs.forEach((productDiv) => {
    productDiv.getProductInput().value = "";
    productDiv.getProductSelect().value = productDiv.getProductSelect()[0].text;
  });
}

class ProductDiv {
  constructor() {
    // Create a new product div
    this.prodDiv = document.createElement("div");
    this.prodDiv.classList.add("product", "flex", "space-x-2", "items-center", "mb-2");

    // Create and style the product select element
    this.productsSelect = document.createElement("select");
    this.productsSelect.classList.add("dropdown", "bg-gray-700", "text-white", "rounded", "p-2");
    this.prodDiv.appendChild(this.productsSelect);

    // Add the "Pick a Product" option
    this.selectProductOption = document.createElement("option");
    this.selectProductOption.innerText = "Pick a Product";
    this.selectProductOption.selected = true;
    this.selectProductOption.disabled = true;
    this.productsSelect.appendChild(this.selectProductOption);

    // Add product options to the select element
    products.forEach((product) => {
      this.productsSelect.appendChild(product.getProductOption());
    });

    // Create and style the quantity input element
    this.productQuantityInput = document.createElement("input");
    this.productQuantityInput.type = "number";
    this.productQuantityInput.placeholder = "* quantity";
    this.productQuantityInput.classList.add("bg-gray-700", "text-white", "rounded", "p-2", "w-20");
    this.prodDiv.appendChild(this.productQuantityInput);

    // Create and style the delete button
    const deleteProductButton = document.createElement("button");
    deleteProductButton.classList.add("bg-red-600", "hover:bg-red-500", "text-white", "font-bold", "py-1", "px-2", "rounded");
    deleteProductButton.innerText = "Delete";
    this.prodDiv.appendChild(deleteProductButton);

    // Create functionality for deleting product Div
    deleteProductButton.addEventListener("click", () => {
      // Delete this product Div from productDivs list
      productDivs.splice(productDivs.indexOf(this.prodDiv), 1);
      this.prodDiv.remove();
    });
  }

  // Setters - getters
  getProductInput() {
    return this.productQuantityInput;
  }

  getProductSelect() {
    return this.productsSelect;
  }

  getProductDiv() {
    return this.prodDiv;
  }
}

class Product {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  equals(productName) {
    return productName === this.name;
  }

  getProductOption() {
    const productOption = document.createElement("option");
    productOption.innerText = this.name;
    productOption.value = this.id;
    return productOption;
  }

  // Setters - getters
  toString() {
    return `Product: ${this.name}, ${this.id}`;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }
}


