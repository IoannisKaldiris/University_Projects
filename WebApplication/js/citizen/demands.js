let pickedProduct;
$(document).ready(function () {
  callAjaxGetRequestFunc("./misc/getProductsCategories.php", onProductsCategoriesRetrieved);

  // Handle category change for demands
  $("#categories-demand").change(() => {
    let url = "./misc/getProductsCategories.php";
    if ($("#categories-demand").find(":selected").text() !== "all categories") {
      url += `?category=${$("#categories-demand").find(":selected").text()}`;
    }
    callAjaxGetRequestFunc(url, (response) => {
      updateProducts(response.products, '#products-grid-demand');
    });
  });

  // Handle search input for demands
  $("#autocomplete-demand").keyup(() => {
    callAjaxGetRequestFunc(`./misc/getProductsCategories.php?productName=${$("#autocomplete-demand").val()}`, (response) => {
      updateProducts(response.products, '#products-grid-demand');
    });
  });

  // Create demand functionality
  $("#create-demand").on("click", () => {
    if (typeof pickedProduct === "undefined") {
      generateAlert("Error", "Invalid Product", "error");
      return;
    }

    if (!parseInt($("#product-quantity").val())) {
      generateAlert("Error", "Invalid Quantity Inserted", "error");
      return;
    }

    const data = { 
      productId: pickedProduct.id, 
      peopleConcerned: $("#product-quantity").val(), 
      date: jsDateToMySqlDate(new Date()) 
    };
    callAjaxPostRequestFunc("./misc/createDemand.php", data, (response) => {
      if (response !== "success") {
        generateAlert("Error", "Could not create demand. Please try again later", "error");
        return;
      }

      generateAlert("Success", "Demand successfully created", "success");
    });
  });
});

function onProductsCategoriesRetrieved(response) {
  const tempProductNames = [];
  updateProducts(response.products, '#products-grid-demand');
  Object.keys(response.products).forEach((key) => {
    tempProductNames.push(response.products[key].name);
  });

  // Initialize all options for categories
  $("#categories-demand").append(new Category("all categories").toDiv(true));
  Object.values(response.categories).forEach((category) => {
    $("#categories-demand").append(new Category(category).toDiv());
  });

  // Setup autocomplete with all product names
  $("#autocomplete-demand").autocomplete({ source: tempProductNames });
}

function updateProducts(products, gridSelector) {
  $(gridSelector).empty();

  Object.keys(products).forEach((key) => {
    $(gridSelector).append(new Product(key, products[key]).toDiv());
  });
}

class Product {
  constructor(id, data) {
    this.id = id;
    this.name = data.name;
    this.category = data.category;
  }

  toDiv() {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-card", "bg-gray-800", "text-white", "p-4", "rounded-lg", "shadow-md", "space-y-2", "flex", "justify-between", "items-center", "hover:bg-gray-700", "cursor-pointer");

    const productInfoDiv = document.createElement("div");

    const productTitle = document.createElement("div");
    productTitle.classList.add("product-title", "font-bold", "text-lg");
    productTitle.innerText = this.name;
    productInfoDiv.appendChild(productTitle);

    productTitle.addEventListener("click", this.setModalData.bind(this));

    const productCategory = document.createElement("div");
    productCategory.classList.add("product-category", "text-sm", "text-gray-400");
    productCategory.innerText = this.category;
    productInfoDiv.appendChild(productCategory);

    productDiv.appendChild(productInfoDiv);
    return productDiv;
  }

  setModalData() {
    pickedProduct = this;
    $("#product-name").text(this.name);
    $("#product-quantity").val(1);
    $("#demand-modal").modal({ fadeDuration: 100 });
  }
}

class Category {
  constructor(name) {
    this.name = name;
  }

  toDiv(first) {
    const option = document.createElement("option");
    if (first) option.innerText = "all categories";
    else option.innerText = this.name;

    return option;
  }
}
