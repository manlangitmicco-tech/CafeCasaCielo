function addToCart(item, price, inputId) {
  let quantity = parseInt(document.getElementById(inputId).value);
  if (quantity < 1) quantity = 1;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cart.find(product => product.item === item);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ item, price, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartTable = document.getElementById("cart");
  let total = 0;

  cartTable.innerHTML = "";

  cart.forEach((product, index) => {
    let subtotal = product.price * product.quantity;
    total += subtotal;

    cartTable.innerHTML += `
      <tr>
        <td>${product.item}</td>
        <td>
          <button onclick="changeQuantity(${index}, -1)">−</button>
          ${product.quantity}
          <button onclick="changeQuantity(${index}, 1)">+</button>
        </td>
        <td>₱${product.price}</td>
        <td>₱${subtotal}</td>
      </tr>
    `;
  });

  document.getElementById("total").textContent = total;
}

function changeQuantity(index, amount) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Thank you for your purchase!");
  localStorage.removeItem("cart");
  displayCart();
}
