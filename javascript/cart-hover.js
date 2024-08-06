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
              <div class="cart-item-price">$${(
                product.priceCents / 100
              ).toFixed(2)}</div>
            </div>
          </div>
        `;
    });
  }

  document.getElementById("cart-menu").innerHTML = cartHtml;
}

function showCart() {
  const cartMenu = document.getElementById("cart-menu");
  renderCart();
  cartMenu.classList.add("show");
}

function hideCart() {
  const cartMenu = document.getElementById("cart-menu");
  cartMenu.classList.remove("show");
}

document.getElementById("cart-hover").addEventListener("mouseover", showCart);
document.getElementById("cart-hover").addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (!document.getElementById("cart-menu").matches(":hover")) {
      hideCart();
    }
  }, 200);
});

document.getElementById("cart-menu").addEventListener("mouseover", showCart);
document.getElementById("cart-menu").addEventListener("mouseout", hideCart);

updateCartQuantity();
