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
            <div class="cart-item-description">${product.description}</div>
            <div class="cart-item-price">$${(product.priceCents / 100).toFixed(
              2
            )}</div>
            <div class="cart-item-quantity">
              <label for="quantity-${cartItem.productId}">Quantity:</label>
              <select id="quantity-${cartItem.productId}" data-product-id="${
        cartItem.productId
      }" class="js-update-quantity">
                ${[...Array(10).keys()]
                  .map(
                    (i) =>
                      `<option value="${i + 1}" ${
                        cartItem.quantity === i + 1 ? "selected" : ""
                      }>${i + 1}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <button class="js-remove-from-cart" data-product-id="${
              cartItem.productId
            }">Remove</button>
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
  document.querySelectorAll(".js-update-quantity").forEach((select) => {
    select.addEventListener("change", (event) => {
      const productId = event.target.dataset.productId;
      const newQuantity = parseInt(event.target.value);
      updateCartItemQuantity(productId, newQuantity);
      renderCart();
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
