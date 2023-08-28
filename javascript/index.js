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
    image: "images/download (6).jpg",
    name: "Apple Air Tag",
    rating: {
      stars: 4.5,
      count: 87,
    },
    price: "23$",
  },
  {
    image: "images/download (7).jpg",
    name: "Apple Airpods Pro 2",
    rating: {
      stars: 4.5,
      count: 87,
    },
    price: "120$",
  },
  {
    image: "images/61+Al0YynpL.jpg",
    name: "Sony ZX Series ",
    rating: {
      stars: 4.5,
      count: 87,
    },
    price: "195.44$",
  },
  {
    image: "images/61YXnbbNrgL._AC_UL600_FMwebp_QL65_.webp",
    name: "Fitbit Charge 5",
    rating: {
      stars: 4.5,
      count: 87,
    },
    price: "195.44$",
  },
  {
    image: "images/download (7).jpg",
    name: "Apple Airpods Pro 2",
    rating: {
      stars: 4.5,
      count: 87,
    },
    price: "120$",
  },
  {
    image: "images/download (7).jpg",
    name: "Apple Airpods Pro 2",
    rating: {
      stars: 4.5,
      count: 87,
    },
    price: "120$",
  },
  {
    image: "images/download (7).jpg",
    name: "Apple Airpods Pro 2",
    rating: {
      stars: 4.5,
      count: 87,
    },
    price: "120$",
  },
  {
    image: "images/download (7).jpg",
    name: "Apple Airpods Pro 2",
    rating: {
      stars: 4.5,
      count: 87,
    },
    price: "120$",
  },
  {
    image: "images/download (7).jpg",
    name: "Apple Airpods Pro 2",
    rating: {
      stars: 4.5,
      count: 87,
    },
    price: "120$",
  },
  {
    image: "images/download (7).jpg",
    name: "Apple Airpods Pro 2",
    rating: {
      stars: 4.5,
      count: 87,
    },
    price: "120$",
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
          src="images/ratings/rating-${product.rating.stars * 10}.png">
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

document.querySelectorAll(".addtocartbutton").forEach((button) => {
  button.addEventListener("click", () => {
    console.log("added product");
  });
});
