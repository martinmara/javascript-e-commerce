let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
  const cartItem = cart.find((item) => item.productId === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ productId, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartItemQuantity(productId, quantity) {
  const cartItem = cart.find((item) => item.productId === productId);
  if (cartItem) {
    cartItem.quantity = quantity;
    if (cartItem.quantity === 0) {
      removeFromCart(productId);
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
}

export { cart, addToCart, updateCartItemQuantity, removeFromCart };
