import { loadProducts, addToCart } from './scripts/products.js';
import { renderCart, increaseQuantity, decreaseQuantity } from './scripts/cart.js';

import "./style.css";


let currentPage = 1;
// let products = [];
export let cartLocal = JSON.parse(localStorage.getItem("cartLocal")) || [];

export function sendRequest(url, method = "GET", options) {
  return fetch(url, { method: method, ...options });
}



function goToPage(pageNumber) {
  currentPage = pageNumber;
  loadProducts(currentPage);
}

const paginationList = document.querySelector(".pagination");

paginationList.addEventListener("click", (event) => {
  if (event.target.classList.contains("pagination-item")) {
    document
      .querySelector(".page")
      .classList.remove("bg-black", "text-white", "page");

    const pageNumber = parseInt(event.target.textContent);

    event.target.classList.add("bg-black", "text-white", "page");

    if (!isNaN(pageNumber)) {
      goToPage(pageNumber);
      event.preventDefault();
    }
  }
});

loadProducts(currentPage);



document.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("add-to-cart-button")) {
    const productId = event.target.getAttribute("data-product-id");

    addToCart(productId);
    openModal();
  }
});

const modal = document.getElementById("cart");

const closeIcon = document.getElementById("close-cart");

function closeModal() {
  modal.classList.add("hidden");
}

function openModal() {
  renderCart();
  modal.classList.remove("hidden");
}

closeIcon.addEventListener("click", closeModal);

const cartIcon = document.getElementById("cart-icon");

cartIcon.addEventListener("click", () => {
  openModal();
});

window.addEventListener("click", function (event) {
  if (
    event.target !== modal &&
    !event.target.classList.contains("add-to-cart-button") &&
    !event.target.classList.contains("cart-icon")
  ) {
    if (!modal.contains(event.target)) {
      closeModal();
    }
  }
});

export const cartList = document.getElementById("cart-list");





class CustomBox extends HTMLElement {
  constructor() {
    super();
    const message = this.getAttribute("message");

    const textNode = document.createTextNode(message);
    this.appendChild(textNode);

    const toggleImage = document.getElementById("toggle");

    toggleImage.addEventListener("click", () => this.toggleVisibility());

    
    this.classList.add("hidden");
  }
  toggleVisibility() {
    this.classList.toggle("hidden");
  }
}

customElements.define("custom-box", CustomBox);
