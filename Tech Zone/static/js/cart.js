let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const itemCount = document.getElementById("itemCount");

function loadCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        const price = Number(item.price.replace(/[^\d]/g, ""));

        total += price;

        cartItems.innerHTML += `

<div class="product-card mb-4">

<div class="row align-items-center">

<div class="col-md-3">

<img src="${item.image}" class="img-fluid">

</div>

<div class="col-md-5">

<h4>${item.name}</h4>

<p>${item.description}</p>

</div>

<div class="col-md-2">

<h5>${item.price}</h5>

</div>

<div class="col-md-2">

<button class="btn btn-danger"

onclick="removeItem(${index})">

Remove

</button>

</div>

</div>

</div>

`;

    });

    cartTotal.textContent = total;

    itemCount.textContent = cart.length;

}

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

function clearCart() {

    localStorage.removeItem("cart");

    cart = [];

    loadCart();

}

loadCart();