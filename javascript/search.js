import { products } from "../data-modules/products.js";
import { addToCart, cart } from "../data-modules/cart.js";

function renderProducts(filteredProducts) {
  let productsHtml = "";

  filteredProducts.forEach((product) => {
    productsHtml += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>
        <div class="product-details">
          <div class="product-name">${product.name}</div>
          <div class="product-price">$${(product.priceCents / 100).toFixed(
            2
          )}</div>
          <div class="product-quantity">
            <label for="quantity-${product.id}">Quantity:</label>
            <select id="quantity-${product.id}" data-product-id="${
      product.id
    }" class="js-update-quantity">
              ${[...Array(10).keys()]
                .map((i) => `<option value="${i + 1}">${i + 1}</option>`)
                .join("")}
            </select>
          </div>
          <button class="add-to-cart-button js-add-to-cart" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>
      </div>
    `;
  });

  document.getElementById("search-results").innerHTML = productsHtml;
  attachEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });
}

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

function searchProducts() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
  renderProducts(filteredProducts);
}

// Initialize the search
searchProducts();
