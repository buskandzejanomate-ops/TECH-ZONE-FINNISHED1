// ===================================
// TECHZONE APP.JS
// ===================================

// ---------- SEARCH ----------

const searchInput = document.getElementById("search");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".product").forEach(product => {

            if (product.innerText.toLowerCase().includes(value)) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

}

// ---------- FILTER ----------

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {

            btn.classList.remove("btn-danger");

            btn.classList.add("btn-outline-light");

        });

        this.classList.remove("btn-outline-light");

        this.classList.add("btn-danger");

        const brand = this.dataset.brand;

        document.querySelectorAll(".product").forEach(product => {

            if (brand === "all") {

                product.style.display = "";

            } else {

                if (product.dataset.brand === brand) {

                    product.style.display = "";

                } else {

                    product.style.display = "none";

                }

            }

        });

    });

});

// ---------- SHOPPING CART ----------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".product-card");

        const product = {

            name: card.querySelector("h3").textContent,

            description: card.querySelector("p").textContent,

            price: card.querySelector("h2").textContent,

            image: card.querySelector("img").src

        };

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartBadge();

        this.innerHTML = '<i class="bi bi-check-circle"></i> Added';

        this.disabled = true;

        setTimeout(() => {

            this.innerHTML = '<i class="bi bi-cart-plus"></i> Add To Cart';

            this.disabled = false;

        }, 1000);

    });

});

// ---------- CART BADGE ----------

function updateCartBadge() {

    const badge = document.querySelector(".badge");

    if (!badge) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    badge.textContent = cart.length;

}

updateCartBadge();

// ---------- WISHLIST ----------

document.querySelectorAll(".bi-heart").forEach(icon => {

    icon.addEventListener("click", function () {

        this.classList.toggle("bi-heart");

        this.classList.toggle("bi-heart-fill");

        this.classList.toggle("text-danger");

    });

});

// ---------- NAVBAR ----------

const navbar = document.querySelector(".glass-nav");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 20) {

        navbar.style.background = "#000";

        navbar.style.boxShadow = "0 0 20px rgba(255,0,0,.4)";

    } else {

        navbar.style.background = "rgba(0,0,0,.85)";

        navbar.style.boxShadow = "none";

    }

});

console.log("TechZone Loaded Successfully");