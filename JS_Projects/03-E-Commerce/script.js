document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product1", price: 29.99 },
    { id: 2, name: "Product2", price: 19.99 },
    { id: 3, name: "Product3", price: 59.99 },
  ];

  const productList = document.querySelector("#product-list");
  const cartItems = document.querySelector("#cart-items");
  const emptyCartMessage = document.querySelector("#empty-cart");
  const cartTotalMessage = document.querySelector("#cart-total");
  const totalPriceDisplay = document.querySelector("#total-price");
  const checkoutBtn = document.querySelector("#checkout-btn");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.forEach((c) => {
    loadCart();
    renderCart();
  });

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add To Cart</button>`;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function loadCart() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      cart.push(...JSON.parse(storedCart));
    }
  }

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const itemId = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(itemId);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCart(); // save
    renderCart();
  }

  function removeFromCart(id) {
    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      cart.splice(index, 1);
    }
    saveCart(); // save
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("product");
        cartItem.innerHTML = `
          ${item.name} - $${item.price.toFixed(2)}
          <button data-id="${item.id}">Remove</button>`;
        cartItems.appendChild(cartItem);
      });
      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    localStorage.removeItem("cart"); // clear storage
    alert("Checkout successfully");
    renderCart();
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
