import { products } from "../data-modules/products.js";
import { addToCart, cart } from "../data-modules/cart.js";

let productsHtml = ``;

products.forEach((product) => {
  productsHtml += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>
        <div class="cart-item-description">${product.description}</div>

      <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${
          product.rating.stars * 10
        }.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-product-quantity" data-product-id="${product.id}">
          ${[...Array(10).keys()]
            .map((i) => `<option value="${i + 1}">${i + 1}</option>`)
            .join("")}
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
        product.id
      }">
        Add to Cart
      </button>
    </div>
  `;
});

document.getElementById("main").innerHTML = productsHtml;

function updateCartQuantity() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerText = cartQuantity;
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productId = button.dataset.productId;
    const quantitySelect = document.querySelector(
      `.js-product-quantity[data-product-id="${productId}"]`
    );
    const quantity = parseInt(quantitySelect.value);

    addToCart(productId, quantity);
    updateCartQuantity();
  });
});

// Initial cart quantity update
updateCartQuantity();
