var initializationFile = "";
$(document).ready(function () {
  let productGrid = null;

  callAjaxGetRequestFunc(
    "./misc/getProductsCategories.php",
    (response) => {
      productGrid = new ProductGrid(Object.values(response["products"]));
  
      // Initialize categories dropdown for product filter
      $("#categories").empty(); // Clear any existing options
      let option = document.createElement("option");
      option.textContent = "all categories";
      $("#categories").append(option);
      response["categories"].forEach((category) => {
        option = document.createElement("option");
        option.textContent = category;
        $("#categories").append(option);
      });
  
      // Populate categories in the add product modal
      const categoriesDropdown = $("#modal-addProduct-category");
      categoriesDropdown.empty(); // Clear any existing options
      response["categories"].forEach((category) => {
        const option = new Option(category, category);
        categoriesDropdown.append(option);
      });
    },
    (error) => {
      generateAlert("Error", "Could not get products from database. Try again later", "error");
    }
  );

  $("#add-product-btn").on("click", () => {
    $("#add-product-modal").modal();
  });

  $("#insert-product-btn").on("click", (event) => {
    const productName = $("#modal-addProduct-title").val();
    const productCategory = $("#modal-addProduct-category").val();
    const productBaseQuantity = $("#modal-addProduct-baseQuantity").val();

    // Check if fields are empty
    if (productName === "" || productCategory === "" || productBaseQuantity === "") {
      generateAlert("Error", "You have to insert all values to create a product", "error");
      return;
    }

    // Check if quantity is an integer
    if (!parseInt(productBaseQuantity)) {
      generateAlert("Error", "Base Quantity has to be an integer", "error");
      return;
    }

    generateConfirm("Confirmation", "Are you sure you want to add this product?", () => {
      const data = { name: productName, category: productCategory, baseQuantity: productBaseQuantity };
      callAjaxPostRequestFunc("./misc/insertProduct.php", data, onProductInsertedSuccess, onProductInsertedError);
    });
  });

  function onProductInsertedSuccess(response) {
    generateAlert("Success", "Product inserted successfully", "success");

    // Make input values empty
    $("#modal-addProduct-title").val("");
    $("#modal-addProduct-category").val("");
    $("#modal-addProduct-baseQuantity").val("");

    // Update product grid after product inserted
    callAjaxGetRequestFunc(
      "./misc/getProductsCategories.php",
      (response) => {
        productGrid.update(Object.values(response["products"]));
      },
      (error) => {
        generateAlert("Error", "Could not get products from database. Try again later", "error");
      }
    );
  }

  function onProductInsertedError(error) {
    generateAlert("Error", "Product could not be inserted", "error");
  }

  // Pick products by category functionality
  $("#categories").change(() => {
    let url = "./misc/getProductsCategories.php";
    if ($("#categories").find(":selected").text() !== "all categories") {
      url += `?category=${$("#categories").find(":selected").text()}`;
    }
    callAjaxGetRequestFunc(
      url,
      (response) => {
        productGrid.update(Object.values(response["products"]));
      },
      (error) => {
        console.log(error);
        generateAlert("Error", "Could not get products from database. Try again later", "error");
      }
    );
  });

  // Initialize autocomplete search functionality
  $("#autocomplete").keyup(() => {
    // When a key is clicked change the product grid
    callAjaxGetRequestFunc(
      `./misc/getProductsCategories.php?productName=${$("#autocomplete").val()}`,
      (response) => {
        productGrid.update(Object.values(response["products"]));
      },
      (error) => {
        console.log(error);
        generateAlert("Error", "Could not get products from database. Try again later", "error");
      }
    );
  });
});

// Class that represents the grid of products
class ProductGrid {
  constructor(_prodData) {
    this.productGridDiv = document.getElementsByClassName("product-grid")[0];
    this.productData = _prodData;

    this.removeAllChildren();
    this.createAllProducts();
  }

  update(_prodData) {
    this.removeAllChildren();
    this.productData = _prodData;
    this.createAllProducts();
  }

  createAllProducts() {
    this.productData.forEach((prod) => {
      this.productGridDiv.appendChild(new Product(prod).getProductDiv());
    });
  }

  // Creates and returns product div
  createSingleProduct(_product) {
    return new Product(_product).getProductDiv();
  }

  // Remove all products from grid
  removeAllChildren() {
    while (this.productGridDiv.firstChild) {
      this.productGridDiv.removeChild(this.productGridDiv.firstChild);
    }
  }
  
}

// Class that represents each product of the grid
class Product {
  constructor(_product) {
    this.productId = _product.id;
    this.productName = _product.name;
    this.productCategory = _product.category;

    // Create the product div with card-like layout
    this.productDiv = document.createElement("div");
    this.productDiv.classList.add("product-card", "bg-gray-800", "text-white", "p-4", "rounded-lg", "shadow-md", "space-y-2", "flex", "flex-col", "items-start", "hover:bg-gray-900", "cursor-pointer");

    // Create and style the product title div
    this.productTitleDiv = document.createElement("div");
    this.productTitleDiv.classList.add("product-title", "font-bold", "text-lg");
    this.productTitleDiv.innerText = this.productName;
    this.productDiv.appendChild(this.productTitleDiv);

    // Create and style the product category div
    this.productCategoryDiv = document.createElement("div");
    this.productCategoryDiv.classList.add("product-category", "text-sm", "text-gray-400");
    this.productCategoryDiv.innerText = this.productCategory;
    this.productDiv.appendChild(this.productCategoryDiv);

    // Add event listener to the product title div
    this.productTitleDiv.addEventListener("click", () => {
      callAjaxGetRequestFunc(`./misc/getProductInfo.php?id=${this.productId}`, this.onProductFound.bind(this), this.onProductError);
    });

    // Create and style the delete button
    const deleteProductBtn = document.createElement("button");
    deleteProductBtn.classList.add("bg-red-600", "hover:bg-red-500", "text-white", "font-bold", "py-1", "px-2", "rounded", "self-end");
    deleteProductBtn.innerText = "X";
    this.productDiv.appendChild(deleteProductBtn);

    // Add event listener to the delete button
    deleteProductBtn.addEventListener("click", () => {
      generateConfirm("Confirmation", "Are you sure you want to delete this product?", () => {
        // Delete product from database
        callAjaxPostRequestFunc("./misc/deleteProduct.php", { productId: this.productId }, this.onProductDeletionSuccess.bind(this), this.onProductDeletionError);
      });
    });
  }

  onProductFound(response) {
    // Change modal info
    let modalProductTitle = document.getElementById("modal-product-title"),
        modalProductCategory = document.getElementById("modal-product-category"),
        modalProductBaseQuantity = document.getElementById("modal-product-baseQuantity"),
        modalProductrescuerQuantity = document.getElementById("modal-product-rescuerQuantity");

    // Delete all event listeners from title and category (from previous runs)
    modalProductTitle.replaceWith(modalProductTitle.cloneNode(true));
    modalProductCategory.replaceWith(modalProductCategory.cloneNode(true));
    modalProductTitle = document.getElementById("modal-product-title");
    modalProductCategory = document.getElementById("modal-product-category");

    // Add event listeners that change the product title and category on grid
    modalProductTitle.addEventListener("input", () => {
      this.productTitleDiv.innerText = modalProductTitle.value;
    });
    modalProductCategory.addEventListener("input", () => {
      this.productCategoryDiv.innerText = modalProductCategory.value;
    });

    modalProductTitle.value = response["name"];
    modalProductCategory.value = response["category"];
    modalProductBaseQuantity.value = response["baseQuantity"];

    // Find all products in rescuers
    let rescuerQuantity = 0;
    Object.values(response["rescuers"]).forEach((value) => {
      if (value.rescuerQuantity === null || value.rescuerQuantity === undefined) return;
      rescuerQuantity += parseInt(value.rescuerQuantity);
    });

    modalProductrescuerQuantity.innerText = rescuerQuantity;

    // Delete all event listeners from apply button (from previous runs)
    let applyBtn = document.getElementById("apply-btn");
    applyBtn.replaceWith(applyBtn.cloneNode(true));

    applyBtn = document.getElementById("apply-btn");
    applyBtn.addEventListener("click", () => {
      this.productName = modalProductTitle.value;
      this.productCategory = modalProductCategory.value;
      console.log({
        name: this.productName,
        quantity: modalProductBaseQuantity.value,
        category: this.productCategory,
        productId: this.productId,
      });
      callAjaxPostRequestFunc(
        "./misc/updateProduct.php",
        {
          name: this.productName,
          quantity: modalProductBaseQuantity.value,
          category: this.productCategory,
          productId: this.productId,
        },
        this.onProductUpdateSuccess.bind(this),
        this.onProductUpdateError
      );
    });

    $("#product-modal").modal({ fadeDuration: 10 });
  }

  onProductError(error) {
    generateAlert("Error", "Could not load Product", "error");
  }

  onProductUpdateSuccess(response) {
    if (response !== "success") {
      generateAlert("Error", "Could not update Product. Please try again later", "error");
      return;
    }
    generateAlert("Success", "Product updated successfully", "success");
  }

  onProductUpdateError(error) {
    generateAlert("Error", "Could not update Product", "error");
  }

  onProductDeletionSuccess(response) {
    generateAlert("Success", "Product deleted successfully", "success");
    this.productDiv.parentElement.removeChild(this.productDiv);
  }
  onProductDeletionError(response) {
    generateAlert("Error", "Product could not be deleted", "error");
  }

  getProductApplyBtn() {
    return productApplyBtn;
  }

  // Setters - getters
  getProductDiv() {
    return this.productDiv;
  }
}
