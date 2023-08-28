function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (e) {
  if (!e.target.matches(".dropbtn")) {
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains("show")) {
      myDropdown.classList.remove("show");
    }
  }
};

const products = [
  {
    id: "1111-3333",
    image: "images/download (6).jpg",
    name: "Apple Air Tag",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: "2344",
  },
  {
    id: "1212-1111",
    image: "images/download (7).jpg",
    name: "Apple Airpods Pro 2",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: "12033",
  },
  {
    image: "images/61+Al0YynpL.jpg",
    name: "Sony ZX Series ",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: "19444",
  },
  {
    id: "7675-1231",
    image: "images/61YXnbbNrgL._AC_UL600_FMwebp_QL65_.webp",
    name: "Fitbit Charge 5",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: "1955",
  },
  {
    id: "4345-1321",
    image: "images/download (7).jpg",
    name: "Apple Airpods Pro 2",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: "12034",
  },
  {
    id: "9865-2345",
    image: "images/download (7).jpg",
    name: "Apple Airpods Pro 2",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: "12022",
  },
  {
    id: "7574-2321",
    image: "images/download (7).jpg",
    name: "Apple Airpods Pro 2",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: "1202",
  },
  {
    id: "4356-3213",
    image: "images/download (7).jpg",
    name: "Apple Airpods Pro 2",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: "2000",
  },
  {
    id: "3343-1213",
    image: "images/download (7).jpg",
    name: "Apple Airpods Pro 2",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: "1200",
  },
  {
    id: "1234-3213",
    image: "images/download (7).jpg",
    name: "Apple Airpods Pro 2",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: "12022",
  },
];

let productsHtml = ``;

products.forEach((product) => {
  productsHtml += `
      <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.getElementById("main").innerHTML = productsHtml;

let matchingitem;
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    let matchingItem;

    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId: productId,
        quantity: 1,
      });
    }

    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    console.log(cart);
    document.getElementById("number").innerHTML = cartQuantity;
  });
});
