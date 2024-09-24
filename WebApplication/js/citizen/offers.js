let pickedProduct;
$(document).ready(function () {
  callAjaxGetRequestFunc("./misc/getProductsCategories.php", onProductsCategoriesRetrieved);

  $("#create-offer").on("click", () => {
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
      quantity: $("#product-quantity").val(),
      date: jsDateToMySqlDate(new Date())
    };

    callAjaxPostRequestFunc("./misc/createOffer.php", data, (response) => {
      if (response !== "success") {
        generateAlert("Error", "Could not create offer. Please try again later", "error");
        return;
      }

      generateAlert("Success", "Offer successfully created", "success");
    });
  });

  $("#categories").change(() => {
    let url = "./misc/getProductsCategories.php";
    if ($("#categories").find(":selected").text() !== "all categories") {
      url += `?category=${$("#categories").find(":selected").text()}`;
    }
    callAjaxGetRequestFunc(url, (response) => {
      updateProducts(response.products);
    });
  });

  $("#autocomplete").keyup(() => {
    // when a key is clicked change the product grid
    callAjaxGetRequestFunc(`./misc/getProductsCategories.php?productName=${$("#autocomplete").val()}`, (response) => {
      updateProducts(response.products);
    });
  });
});

function onProductsCategoriesRetrieved(response) {
  const tempProductNames = [];
  updateProducts(response.products);
  Object.keys(response.products).forEach((key) => {
    tempProductNames.push(response.products[key].name);
  });

  // initialize all options for categories
  $("#categories").append(new Category("all categories").toDiv(true));
  Object.values(response.categories).forEach((category) => {
    $("#categories").append(new Category(category).toDiv());
  });

  // setup autocomplete with all product names
  $("#autocomplete").autocomplete({ source: tempProductNames });
}

function updateProducts(products) {
  $("#products-grid").empty();

  Object.keys(products).forEach((key) => {
    $("#products-grid").append(new Product(key, products[key]).toDiv());
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
    $("#offer-modal").modal({ fadeDuration: 100 });
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
