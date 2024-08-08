import {
  cart as initialCart,
  updateCartItemQuantity,
  removeFromCart,
} from "../data-modules/cart.js";
import { products } from "../data-modules/products.js";

function getTotalCartQuantity(cart) {
  return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
}

function updateCartQuantity() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = getTotalCartQuantity(cart);
  document.querySelector(".js-cart-quantity").innerText = totalQuantity;
}

function renderCart() {
  let cartHtml = "";

  const cart = JSON.parse(localStorage.getItem("cart")) || initialCart;
  if (cart.length === 0) {
    cartHtml = "<p>Your cart is empty</p>";
  } else {
    cart.forEach((cartItem) => {
      const product = products.find(
        (product) => product.id === cartItem.productId
      );

      cartHtml += `
        <div class="cart-item">
          <div class="cart-item-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="cart-item-details">
            <div class="cart-item-name">${product.name}</div>
            <div class="cart-item-price">$${(product.priceCents / 100).toFixed(
              2
            )}</div>
            <div class="cart-item-quantity" id="quantity-container-${
              cartItem.productId
            }">
              <button class="js-update-button" data-product-id="${
                cartItem.productId
              }" data-current-quantity="${cartItem.quantity}">Update</button>
            </div>
            <button class="js-remove-from-cart" data-product-id="${
              cartItem.productId
            }">Remove</button>
          </div>
          <label for="delivery-options">Choose your delivery option:</label>
          <select id="delivery-options">
            <option value="standard">Standard (5-7 days)</option>
            <option value="express">Express (2-3 days)</option>
            <option value="overnight">Overnight (1 day)</option>
          </select>

          <div id="delivery-date-container">
            Estimated Delivery Date: <span id="delivery-date"></span>
          </div>
        </div>
      `;
    });
  }

  document.getElementById("checkoutcontainer").innerHTML = cartHtml;
  attachEventListeners();
  updateCartQuantity();
}

function attachEventListeners() {
  document.querySelectorAll(".js-update-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.productId;
      const quantityContainer = document.getElementById(
        `quantity-container-${productId}`
      );

      quantityContainer.innerHTML = `
        <select id="quantity-${productId}" data-product-id="${productId}" class="js-update-quantity">
          ${[...Array(10).keys()]
            .map(
              (i) =>
                `<option value="${i + 1}" ${
                  parseInt(event.target.dataset.currentQuantity) === i + 1
                    ? "selected"
                    : ""
                }>${i + 1}</option>`
            )
            .join("")}
        </select>
        <button class="js-save-button" data-product-id="${productId}">Save</button>
      `;

      document
        .querySelector(`.js-save-button[data-product-id="${productId}"]`)
        .addEventListener("click", () => {
          const newQuantity = parseInt(
            document.getElementById(`quantity-${productId}`).value
          );
          updateCartItemQuantity(productId, newQuantity);
          renderCart();
        });
    });
  });

  document.querySelectorAll(".js-remove-from-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      removeFromCart(productId);
      renderCart();
    });
  });
}

renderCart();

document.addEventListener("DOMContentLoaded", function () {
  const deliveryOptions = document.getElementById("delivery-options");
  const deliveryDateContainer = document.getElementById("delivery-date");

  function calculateDeliveryDate() {
    const today = dayjs();
    let deliveryDays;

    switch (deliveryOptions.value) {
      case "standard":
        deliveryDays = 5; // Standard delivery: 5-7 days
        break;
      case "express":
        deliveryDays = 2; // Express delivery: 2-3 days
        break;
      case "overnight":
        deliveryDays = 1; // Overnight delivery: 1 day
        break;
      default:
        deliveryDays = 5;
    }

    const estimatedDeliveryDate = today
      .add(deliveryDays, "day")
      .format("dddd, MMMM D, YYYY");
    deliveryDateContainer.textContent = estimatedDeliveryDate;
  }

  // Calculate delivery date on page load
  calculateDeliveryDate();

  // Recalculate delivery date when the user changes the delivery option
  deliveryOptions.addEventListener("change", calculateDeliveryDate);
});
